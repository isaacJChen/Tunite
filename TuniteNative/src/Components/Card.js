import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, Dimensions, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { TabNavigator } from 'react-navigation';

export default class Card extends Component {
  render() {
    let width = Dimensions.get("window").width
    let height = Dimensions.get("window").height
    let uri = '../img/custom-album-cover.jpg'
    return (
      <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('SongDetail', {
        Name: this.props.songName,
        otherParam: 'anything you want here',
      })}>
      <View style={{
        height: width,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}>
          <Image source={require(uri)} style={{flex: 1, height:undefined, width:undefined}}/>
          {/* the other image tag uses an online url which is what we will use in production */}
          {/* <Image source={{uri: this.props.cover}} style={{flex: 1, height:undefined, width:undefined}}/> */}
        </View>
        <View style={{backgroundColor: 'rgba(52, 3, 3, 0.7)'}}>
          <Text style={{color:'white'}}>
            {this.props.tags}
          </Text>
        </View>
        <View style={{backgroundColor: '#fff', paddingLeft:10, flexDirection: 'row'}}>
          <View>
            <Image source={require('../img/headshot.jpg')} style={{height:50, width: 50, borderRadius: 25, marginTop: 5, marginBottom: 5}}/>
          </View>
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>
              {this.props.songName}
            </Text>
            <Text style={{}}>
              {this.props.creator}
            </Text>
          </View>
        </View>
      </View>
      </TouchableNativeFeedback>

    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Card);
