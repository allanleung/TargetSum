import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import PropsTypes from "prop-types";

class RandomNumber extends React.Component {
    static propTypes = {
        id: PropsTypes.number.isRequired,
        number: PropsTypes.number.isRequired,
        isDisabled: PropsTypes.bool.isRequired,
        onPress: PropsTypes.func.isRequired,
    }
    handlePress = () => {
        if(this.props.isDisabled) { return; }
        this.props.onPress(this.props.id);
    };
    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>
                    {this.props.number}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#999',
        width: 100,
        marginHorizontal: 15,
        marginVertical: 25,
        fontSize: 40,
        textAlign: 'center',
    },
    disabled: {
        opacity: 0.3,
    }
});

export default RandomNumber;
