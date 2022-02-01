/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet,
  Text,
  View,
} from 'react-native';
import Game from "./Game"

class App extends React.Component {
  state = {
    gameId: 1,
  };
  resetGame  = () => {
    this.setState((prevState) => {
      return { gameId: prevState.gameId + 1 };
    });
  };

  render(){
    return (
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Sum Target Game</Text>
          <Game
              key={this.state.gameId}
              onPlayAgain={this.resetGame}
              randomNumberCount={12}
              initialSeconds={20}/>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    paddingVertical: -10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    backgroundColor: 'pink',
    flex: 1,
    paddingTop: 100,
  },
});

export default App;
