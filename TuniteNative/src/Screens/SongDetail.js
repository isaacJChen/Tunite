import React, { Component } from 'react';
import { AppRegistry, View, Button, Text } from 'react-native';

export default class SongDetail extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View >
          <Text>SongDetail</Text>
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => SongDetail);