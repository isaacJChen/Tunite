import React, { Component } from 'react';
import { AppRegistry, View, Button, Text } from 'react-native';
import Title from '../Components/Title';

export default class MainView extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View >
          <Text>screen 1</Text>
          <Button onPress={() => this.props.navigation.navigate('Collection')}
            title = "Button"
          />
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Profile);