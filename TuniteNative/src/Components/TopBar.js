import React, { Component } from 'react';
import { AppRegistry, View, Button, Text } from 'react-native';
import Title from '../Components/Title';
import { TabNavigator, StackNavigator } from 'react-navigation';

export default class TopBar extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BF1515'
      }}>
        <Text style={{color: 'white'}}>{this.props.title}</Text>
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => TopBar);
