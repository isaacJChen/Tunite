import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Title from '../Components/Title'
import Song from '../Screens/Song'

export default class Collection extends Component {
  render() {
    return (
      <View >
        <Song navigation={this.props.navigation} />
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Collection);