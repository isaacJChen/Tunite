import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, StyleSheet, Button, Alert, TouchableHighlight } from 'react-native';

export default class Title extends Component {
    render() {
        return (
            // Try setting `alignItems` to 'flex-start'
            // Try setting `justifyContent` to `flex-end`.
            // Try setting `flexDirection` to `row`.
            <View style={styles.tag}>
                <Text style={styles.credit}>{this.props.role}</Text>
                <Image
                    source={require('../img/contact_icon.png')}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <Text style={styles.text}>{this.props.tag}</Text>
                <TouchableHighlight
                    onPress={() => {
                        Alert.alert('You tapped the button!');
                    }}
                >
                    <View
                        style={styles.button}
                    >
                        <Text>follow</Text>
                </View>
                </TouchableHighlight>
            </View>
        );
    }
};

var styles = StyleSheet.create({
    text: {
        margin: 5,
    },
    credit: {
        margin: 5,
        fontWeight: 'bold'
    },
    button: {
        height: 20,
        width: 60,
        borderRadius: 8,
        alignItems: 'center'
    },
    tag: {
        flexDirection: "column", margin: 5, padding: 5, width: 100, alignItems: 'center'
    }
})
