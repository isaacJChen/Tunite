import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, Image, ScrollView, Dimensions, TouchableNativeFeedback, FlatList, TouchableOpacity, Alert } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Tag from '../Components/Tag';
import MusicPlayer from '../Components/MusicPlayer';
import Coverflow from 'react-native-coverflow';
import * as firebase from "firebase";
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';


class Song extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      track: {
          id: this.props.playerID,
          url: { uri: this.props.songUrl }, // Load media from the app bundle
      }
    }

  }

  componentDidMount(){
    firebase.storage().ref().child(this.props.playerID).getDownloadURL().then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
      let track = {
        id: this.props.playerID,
        url: {uri: url}
      }
      this.setState({ track: track })
    }).catch(function (error) {
      // Handle any errors
      Alert.alert(error.toString())
    });

    firebase.storage().ref().child(this.props.upload.image).getDownloadURL().then((url)=>{
      this.setState({imageUrl: url})
    }).catch(function (error) {
      // Handle any errors
      Alert.alert(error.toString())
    });
  }

  render() {
    return(
      <View style={{height:'100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}>
          <MusicPlayer ref="player" callback={()=>{}} style={{height: '100%', width: '100%', backgroundColor: 'black'}} id={this.props.playerID} image={this.state.imageUrl} track={this.state.track} fullSong={true} />
        </View>
      </View>
    )
  }
}

export default class Explore extends Component {
  constructor(props){
    super(props);
    let songs = [
    ]
    this.songRefs = []
    let songdata = []
    for (idx in this.props.navigation.state.params.uploads) {
      if (this.props.navigation.state.params.uploads[idx].root ==this.props.navigation.state.params.rootId) {
        songs.push(
          <Song ref={(node)=>{this.songRefs.push(node)}} key={idx} playerID={idx} upload={this.props.navigation.state.params.uploads[idx]} />
        )
        songdata.push({
            id: idx,
            name: this.props.navigation.state.params.uploads[idx].songName,
            tags: Object.keys(this.props.navigation.state.params.uploads[idx].tags)
        })
      }
    }


    this.state = {
        currentSong: songdata[0].name,
        songs: songs,
        songdata: songdata,
        currentIdx: 0
    }
  }


  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;

      return {
          title: 'Explore',
          swipeEnabled: false,
          tabBarIcon: params.iconMaker,
          headerStyle: { backgroundColor: '#BF4949' },
          headerTitleStyle: { color: 'white' },
      }
  };

  getTags(){
    let tags = []
    for (idx in this.state.songdata[this.state.currentIdx].tags) {
      let tag = this.state.songdata[this.state.currentIdx].tags[idx]
      tags.push(
        <Tag tag={tag} image={'http://identicon-1132.appspot.com/' + tag.replace(/\s/g, '')}/>
      )
    }
    return tags
  }


  _addToCollection(songId) {
    let uid = firebase.auth().currentUser.uid
    firebase.database().ref('users/' + uid + '/collection/' + songId).once('value').then((snapshot) => {
      let alreadyAdded = snapshot.val()
      if (!alreadyAdded) {
        firebase.database().ref('uploads/' + songId + '/collectionCount').once('value').then((snapshot) => {
          let count = snapshot.val()
          let updates = {};
          updates['uploads/' + songId + '/collectionCount'] = count + 1;
          firebase.database().ref().update(updates);
        })
      }
    })

    let updates = {};
    updates['/users/' + uid + '/collection/' + songId] = songId;
    firebase.database().ref().update(updates)
    Alert.alert("Added to collection!")
  }

  render() {

    return(
      <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-evenly'}}>

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold',}}>{this.state.currentSong}</Text>
        </View>

        <Coverflow style={{height: '45%', width:'100%'}} onChange={(index) => {
          //Alert.alert(this.songRefs[this.songRefs.length-index-1].refs.player.props.id)
          for (idx in this.songRefs){
            this.songRefs[this.songRefs.length-index-1].refs.player.setState({playing: false})
            TrackPlayer.reset()
          }
          this.setState(
            {currentSong: this.state.songdata[index].name, currentIdx: index}
          )

        }}>
          {this.state.songs}
        </Coverflow>


        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {
            this.getTags()
          }
          {/* <Tag tag={this.state.tags[0].tag} image='https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350'/>
          <Tag tag={this.state.tags[0].tag} image='https://images.pexels.com/photos/374703/pexels-photo-374703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350'/>
          <Tag tag={this.state.tags[0].tag} image ='https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350'/> */}
        </View>


        <View style={{marginLeft: 30, marginRight:30, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}  onPress={()=> this._addToCollection(this.state.songdata[this.state.currentIdx].id)}>
            <Image source={require('../img/save-btn.png')} style={{marginTop: 5, marginBottom: 5}}/>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../img/save-btn.png')} style={{marginTop: 5, marginBottom: 5}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../img/save-btn.png')} style={{marginTop: 5, marginBottom: 5}}/>
          </TouchableOpacity> */}
        </View>
      </View>

    )
  }
}
