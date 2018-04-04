import React, { Component } from 'react';
import { AppRegistry, View, Button, Text } from 'react-native';
import Title from '../Components/Title';
import { TabNavigator, StackNavigator } from 'react-navigation';

export default class Song extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View >
          <Text>Song</Text>
          <Button onPress={() => this.props.navigation.navigate('SongDetail')}
            title = "Button"
          />
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Song);