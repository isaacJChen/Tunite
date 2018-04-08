import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, Image, TouchableNativeFeedback } from 'react-native';

export default class Song extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('SongDetail')}>
      <View style={{height: 65, flexDirection: 'row', alignItems:'center'}}>
        <Image
            source={require('../img/play_icon.png')}
            style={{width: 25, height: 25, borderRadius: 25, marginRight: 7, marginLeft: 7}}
          />
        <Image
            source={require('../img/an.jpg')}
            style={{width: 50, height: 50, borderRadius: 25, marginRight: 7, marginLeft: 7}}
          />
          <View style={{marginLeft: 7}} >
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{this.props.songName}</Text>
              <Text>{this.props.tagName}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Song);