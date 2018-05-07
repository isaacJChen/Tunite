import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, Dimensions, ImageBackground, TouchableNativeFeedback, TouchableOpacity  } from 'react-native';
import { TabNavigator } from 'react-navigation';
import MusicPlayer from '../Components/MusicPlayer'

export default class Card extends Component {
  constructor(){
    super()
    this.state = {
      uri: '../img/custom-album-cover.jpg',
      playing: false
    }
  }

  render() {
    let width = Dimensions.get("window").width
    let height = Dimensions.get("window").height
    let uri = '../img/custom-album-cover.jpg'
    return (
      <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('SongDetail', {
        Name: this.props.songName,
        iconMaker: this.props.iconMaker,
      })}>
      <View style={{
        height: 310,
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
          <MusicPlayer image={this.props.cover}/>
          {/* <Image   source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{flex: 1, height:undefined, width:undefined}}/> */}
          {/* the other image tag uses an online url which is what we will use in production */}
          {/* <Image source={{uri: this.props.cover}} style={{flex: 1, height:undefined, width:undefined}}/> */}
        </View>

        <View style={{flexDirection: 'row', position:'absolute', right:5, bottom:25, zIndex: 1}}>
          <TouchableOpacity >
            <Image source={require('../img/save-btn.png')} style={{height:50, width: 50, borderRadius: 25, marginTop: 5, marginBottom: 5}}/>
          </TouchableOpacity>
          <TouchableOpacity >
            <Image source={require('../img/musicNoteBtn.png')} style={{height:50, width: 50, borderRadius: 25, marginTop: 5, marginBottom: 5}}/>
          </TouchableOpacity>
        </View>




        <View style={{backgroundColor: 'rgba(52, 3, 3, 0.7)'}}>
          <Text style={{color:'white'}}>
            {this.props.tags}
          </Text>
        </View>




        {/* <TouchableOpacity onPress={() => this.setState({playing: !this.state.playing})} style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={this.state.playing ? require('../img/pause.png') : require('../img/roundPlayButton.png')} style={{margin: 5}}/>
        </TouchableOpacity> */}

        <View style={{backgroundColor: '#fff', paddingLeft:10, flexDirection: 'row'}}>
          <View>
            <Image source={{uri: "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"}} style={{height:50, width: 50, borderRadius: 25, marginTop: 5, marginBottom: 5}}/>
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
