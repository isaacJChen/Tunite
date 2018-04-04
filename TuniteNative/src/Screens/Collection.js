import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Title from '../Components/Title'

export default class Collection extends Component {
  render() {
    return (
      <View >
        <Title />
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Collection);