import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, Dimensions, ImageBackground } from 'react-native';
import { TabNavigator } from 'react-navigation';

export default class Card extends Component {
  render() {
    let width = Dimensions.get("window").width
    let height = Dimensions.get("window").height
    let uri = '../img/custom-album-cover.jpg'
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        height: height/3,
        marginTop: 5,
        marginBottom: 5,
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
            <Image source={require('../img/headshot.jpg')} resizeMode= 'contain' style={{flex: 1, height:50, width: 50, borderRadius: 100}} resizeMode="contain"/>
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={{fontWeight: 'bold'}}>
              {this.props.title}
            </Text>
            <Text style={{}}>
              {this.props.creator}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Card);
