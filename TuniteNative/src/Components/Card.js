import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, Dimensions, ImageBackground, TouchableNativeFeedback, TouchableOpacity, Alert } from 'react-native';
import { TabNavigator } from 'react-navigation';
import MusicPlayer from '../Components/MusicPlayer';
import TrackPlayer from 'react-native-track-player';
import * as firebase from "firebase";

export default class Card extends Component {
  constructor() {
    super()
    this.state = {
      uri: '../img/custom-album-cover.jpg',
      playing: false,
      test: "test",
      promoted: false,
      original: false,
      favorite: false,
    }
  }

  componentWillMount() {
    firebase.database().ref('uploads/' + this.props.songId + '/promoted').once('value').then((snapshot) => {
      let val = snapshot.val()
      // let bool = ""+val
      // Alert.alert(bool)
      if (val) {
        this.setState({
          promoted: true,
        })
      }
    })
    firebase.database().ref('uploads/' + this.props.songId + '/root').once('value').then((snapshot) => {
      let val = snapshot.val()
      if (val == this.props.songId) {
        this.setState({
          original: true,
        })
      }
    })
    firebase.database().ref('uploads/' + this.props.songId + '/root').once('value').then((snapshot) => {
      let val = snapshot.val()
      firebase.database().ref('uploads/' + val + '/mostPopularVersion').once('value').then((snapshot) => {
        let val2 = snapshot.val()
        if(val2 == this.props.songId) {
          this.setState({
            favorite: true,
          })
        }
      })
      
    })
  }

  _press() {
    this.refs.player.setState({ playing: false })
    this.props.callback("");
    this.props.navigation.navigate('SongDetail', {
      Name: this.props.songName,
      iconMaker: this.props.iconMaker,
      songUrl: this.props.mp3,
      songCover: this.props.cover,
      songId: this.props.songId
    })
    TrackPlayer.reset();
  }

  _toExplore(){
    this.refs.player.setState({playing:false})
    this.props.callback("");
    this.props.navigation.navigate('Explore', {
      Name: this.props.songName,
      iconMaker: this.props.iconMaker,
      songUrl: this.props.mp3,
      songCover: this.props.cover,
      songId: this.props.songId
    })
    TrackPlayer.reset();
  }


  _addToCollection() {
    let uid = firebase.auth().currentUser.uid
    firebase.database().ref('users/' + uid + '/collection/'+ this.props.songId).once('value').then((snapshot)=>{
      let alreadyAdded = snapshot.val()
      if (!alreadyAdded) {
        firebase.database().ref('uploads/'+this.props.songId+'/collectionCount').once('value').then((snapshot)=>{
          let count = snapshot.val()
          let updates = {};
          updates['uploads/'+this.props.songId+'/collectionCount'] = count+1;
          firebase.database().ref().update(updates);
        })
      }
    })

    let updates = {};
    updates['/users/' + uid + '/collection/' + this.props.songId] = this.props.songId;
    firebase.database().ref().update(updates)
    Alert.alert("Added to collection!")
  }

  render() {
    let width = Dimensions.get("window").width
    let height = Dimensions.get("window").height
    let uri = '../img/custom-album-cover.jpg'
    let track = {
      id: this.props.id,
      url: { uri: this.props.mp3 }, // Load media from the app bundle

      artwork: require('../img/cover_art.png')
    };
    return (
      <TouchableNativeFeedback onPress={() => this._press()} style={{ display: 'none' }}>
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
            <MusicPlayer callback={this.props.callback} id={this.props.id} ref="player" image={this.props.cover} track={track} fullSong={false} />
            {/* <Image   source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{flex: 1, height:undefined, width:undefined}}/> */}
            {/* the other image tag uses an online url which is what we will use in production */}
            {/* <Image source={{uri: this.props.cover}} style={{flex: 1, height:undefined, width:undefined}}/> */}
          </View>

          <View style={{ flexDirection: 'row', position: 'absolute', right: 5, bottom: 25, zIndex: 1 }}>
            <TouchableOpacity onPress={() => this._addToCollection()}>
              <Image source={require('../img/save-btn.png')} style={{ height: 50, width: 50, borderRadius: 25, marginTop: 5, marginBottom: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this._toExplore()}>
              <Image source={require('../img/musicNoteBtn.png')} style={{ height: 50, width: 50, borderRadius: 25, marginTop: 5, marginBottom: 5 }} />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: 'rgba(52, 3, 3, 0.7)' }}>
            <Text style={{ color: 'white' }}>
              <Image source={this.state.promoted ? require('../img/star.png') : null} style={{ height: 50, width: 50, }} />
              <Image source={this.state.favorite ? require('../img/heart.png') : null} style={{ height: 50, width: 50, }} />
              <Image source={this.state.original ? require('../img/stack.png') : null} style={{ height: 50, width: 50, }} />
              {this.props.tags}
            </Text>
          </View>




          {/* <TouchableOpacity onPress={() => this.setState({playing: !this.state.playing})} style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={this.state.playing ? require('../img/pause.png') : require('../img/roundPlayButton.png')} style={{margin: 5}}/>
        </TouchableOpacity> */}

          <View style={{ backgroundColor: '#fff', paddingLeft: 10, flexDirection: 'row' }}>
            <View>
              <Image source={{ uri: "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" }} style={{ height: 50, width: 50, borderRadius: 25, marginTop: 5, marginBottom: 5 }} />
            </View>
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>
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
