import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, TextInput, Image} from 'react-native';
import Title from '../Components/Title';
import Icon from 'react-native-vector-icons'
import { TabNavigator, StackNavigator } from 'react-navigation';

export default class TopBar extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{backgroundColor: '#BF4949', padding: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
          <Image style={{height: 40, width: 40}} source={require('../img/searchIcon.png')} />
          <TextInput style={{flex: 1, color: '#424242'}}/>
        </View>
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => TopBar);
