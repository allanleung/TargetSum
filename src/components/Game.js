import React from 'react';
import { StyleSheet, Text, View, Button, Pressable, TouchableOpacity } from 'react-native';
import PropsTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';
import LinearGradient from "react-native-linear-gradient";

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropsTypes.number.isRequired,
        initialSeconds: PropsTypes.number.isRequired,
        onPlayAgain: PropsTypes.func.isRequired,
    }
    state = {
        selectedIds: [],
        remainingSecond: this.props.initialSeconds,
    }
    gameStatus = 'PLAYING'



    randomNumbers = Array
        .from({length: this.props.randomNumberCount})
        .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0,this.props.randomNumberCount - Math.floor(Math.random() * 2) - 1)
        .reduce((acc,curr) => acc + curr, 0);

    shuffleRandomNumbers = shuffle(this.randomNumbers);

    // Reset Everything

    componentDidMount() {
        this.intervalId = setInterval(() =>{
            this.setState((prevState) => {
                return { remainingSecond : prevState.remainingSecond - 1 }
            }, () => {
                if(this.state.remainingSecond === 0) {
                    clearInterval(this.intervalId);
                }
            });
        }, 1000)
    }
    componentWillMount() {
        clearInterval(this.intervalId);
    }

    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    }
    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, numberIndex],
            }));
    };
    // TODO: Shuffle the random number

    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) {
        if (nextState.selectedIds != this.state.selectedIds || nextState.remainingSecond === 0) {
            this.gameStatus = this.calcGameStatus(nextState);
        }
        if (this.gameStatus != 'PLAYING') {
            clearInterval(this.intervalId);
        }
    }

    // gameStatus: PLAYING, WON, LOST
    calcGameStatus = (nextState) => {
        console.log('calcGameStatus...')
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffleRandomNumbers[curr];
        }, 0);
        if(nextState.remainingSecond === 0) {
            return 'LOST';
        }
        if(sumSelected < this.target) {
            return 'PLAYING';
        }
        if (sumSelected === this.target) {
            return 'WON';
        }
        if (sumSelected > this.target) {
            return 'LOST';
        }
    };



    render() {
        const gameStatus = this.gameStatus;
        return (
            <View style={styles.container}>
                <Text style={styles.topStatus}>{gameStatus}</Text>

                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
                    {this.target}
                </Text>
                <View style={styles.randomContainer}>
                {this.shuffleRandomNumbers.map((randomNumber,index) =>
                    <RandomNumber
                        key={index}
                        id={index}
                        number={randomNumber}
                        isDisabled={
                            this.isNumberSelected(index) || gameStatus != 'PLAYING'
                        }
                        onPress={this.selectNumber}
                    />
                )}
                </View>
                <Button title={'Play Again'} onPress={this.props.onPlayAgain}/>
                <Text style={styles.bottomStatus}>Timer: {this.state.remainingSecond}</Text>
                    {/*<TouchableOpacity style={styles.playAgainButton} onPress={this.props.onPlayAgain}>*/}
                    {/*<Text> Play Again </Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        flex: 1,
        paddingTop: 50,
    },
    target: {
        fontSize: 50,
        backgroundColor: '#aaa',
        marginHorizontal: 50,
        textAlign: 'center',
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    random: {
        backgroundColor: '#999',
        width: 100,
        marginHorizontal: 15,
        marginVertical: 25,
        fontSize: 40,
        textAlign: 'center',
    },
    playAgainButton: {
        alignItems: 'Top',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    topStatus: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        paddingTop: 0,
        paddingBottom: 10,
    },
    bottomStatus: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        paddingBottom: 50,
    },
    STATUS_PLAYING: {
        backgroundColor: '#bbb',
    },
    STATUS_WON: {
        backgroundColor: 'green',
    },
    STATUS_LOST: {
        backgroundColor: 'red',
    },
});

export default Game;
