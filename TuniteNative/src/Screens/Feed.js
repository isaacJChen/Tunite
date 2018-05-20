import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, ScrollView, StatusBar, TouchableOpacity, Image, Alert,TextInput } from 'react-native';
import Card from '../Components/Card';
import TopBar from '../Components/TopBar'
import SearchBar from '../Components/SearchBar'
import * as firebase from "firebase";

let iconMaker = function() {
  return (<View style={{height: '100%', width: '100%', alignItems:'center', justifyContent: 'center'}}><Image style={{height: '70%', width: '70%'}} source={require('../img/tabBarIconHome.png')} /><Text style={{color: 'white', fontWeight: 'bold'}}>Home</Text></View>)
}


export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser,
      databaseRef: firebase.database().ref(),
      current: "",
      songName:[],
      musics: [],
      songUrls: [],
      imageUrls: [],
      creatorNames: []
    };

    this.songUrls = []
    this.imageUrls=[]

    this.songName = []
    this.creatorNames = []
  }


  static navigationOptions = {
    header: null,
    swipeEnabled: false,
    tabBarIcon: iconMaker
  }

  upload() {
    var postData = {
      fromMobile: "test",
      fromMobile2: "test2"
    };

    var newPostKey = firebase.database().ref().child('uploads').push().key;

    var updates = {};
    updates['/uploads/' + newPostKey] = postData;
    firebase.database().ref().update(updates);
  }

  callback(x){
    if( this.state.current == x) {
    } else if (this.state.current != "") {
      //this.refs[this.cardTags[this.state.current]].refs.player.setState({
      this.refs[this.state.current].refs.player.setState({
        playing: false
      });
    }
    this.setState({
      current: x
    })
  }

  componentDidMount(){
    let followings = []
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/following').once('value').then((snapshot)=>{
      followings = Object.keys(snapshot.val())

      for (let tag in followings) {
        firebase.database().ref('tags/' + followings[tag] + '/songs').once('value').then((snapshot)=>{
          songsFromFB = snapshot.val()
          songsArray = []
          let keys = Object.keys(songsFromFB)
          for (let key in keys){
            let obj = {}
            obj["key"] = keys[key]
            obj["values"] = songsFromFB[keys[key]]
            songsArray.push(obj)
          }
          songsArray.sort(this.compare)

          firebase.database().ref('uploads').once('value').then((snapshot)=>{
            let uploads = snapshot.val()
            let songName = []
            let urls = []
            for (let i=0;i<20;i++){
              if (i===songsArray.length) {
                break
              }
              let s= uploads[songsArray[i].key].songName
              songName.push(s)
              let m = songsArray[i].key
              let img = uploads[songsArray[i].key].image

              let creatorid = uploads[songsArray[i].key].owner
              firebase.database().ref('users/' + creatorid).once('value').then((snapshot)=>{
                let profile = snapshot.val()
                this.creatorNames.push(profile.userName)
                this.setState({creatorNames: this.creatorNames})
              })


              //get song file
              firebase.storage().ref().child(m).getDownloadURL().then( (url) => {
                // `url` is the download URL for 'images/stars.jpg'
                this.songUrls.push(url)
                this.setState({songUrls: this.songUrls})
              }).catch(function(error) {
                // Handle any errors
                Alert.alert(error.toString())
              });

              //get image file
              firebase.storage().ref().child(img).getDownloadURL().then( (url) => {
                // `url` is the download URL for 'images/stars.jpg'
                this.imageUrls.push(url)
                this.setState({imageUrls: this.imageUrls})
              }).catch(function(error) {
                // Handle any errors
                Alert.alert(error.toString())
              });

            }
            // this.setState({songName: songName, songUrls: this.songUrls, imageUrls: this.imageUrls})
            this.setState({songName: songName})
          })
        })
      }
    })
  }

  compare(a,b) {
    if (a.values.timeStamp < b.values.timeStamp)
      return 1;
    if (a.values.timeStamp > b.values.timeStamp)
      return -1;
    return 0;
  }

  resetAndSearch(tag){
    this.songUrls = []
    this.imageUrls=[]

    this.songName = []
    this.creatorNames = []
    this.creatorNames = []
    this.search(tag)
  }

  search(searchedTag) {
    firebase.database().ref('tags/' + searchedTag + '/songs').once('value').then((snapshot)=>{
      songsFromFB = snapshot.val()
      if (!songsFromFB) {
        Alert.alert("No search result found!")
      } else {
        songsArray = []
        let keys = Object.keys(songsFromFB)
        for (let key in keys){
          let obj = {}
          obj["key"] = keys[key]
          obj["values"] = songsFromFB[keys[key]]
          songsArray.push(obj)
        }
        songsArray.sort(this.compare)

        firebase.database().ref('uploads').once('value').then((snapshot)=>{
          let uploads = snapshot.val()
          let songName = []
          let creatorNames = []
          let urls = []
          for (let i=0;i<20;i++){
            if (i===songsArray.length) {
              break
            }
            let s= uploads[songsArray[i].key].songName
            songName.push(s)
            let m = songsArray[i].key
            let img = uploads[songsArray[i].key].image

            let creatorid = uploads[songsArray[i].key].owner
            firebase.database().ref('users/' + creatorid).once('value').then((snapshot)=>{
              let profile = snapshot.val()
              this.creatorNames.push(profile.userName)
              this.setState({creatorNames: this.creatorNames})
            })

            //get song file
            firebase.storage().ref().child(m).getDownloadURL().then( (url) => {
              // `url` is the download URL for 'images/stars.jpg'
              this.songUrls.push(url)
              this.setState({songUrls: this.songUrls})
            }).catch(function(error) {
              // Handle any errors
              Alert.alert(error.toString())
            });

            //get image file
            firebase.storage().ref().child(img).getDownloadURL().then( (url) => {
              // `url` is the download URL for 'images/stars.jpg'
              this.imageUrls.push(url)
              this.setState({imageUrls: this.imageUrls})
            }).catch(function(error) {
              // Handle any errors
              Alert.alert(error.toString())
            });

          }
          // this.setState({songName: songName, songUrls: this.songUrls, imageUrls: this.imageUrls})
          this.setState({songName: songName})
        })
      }

    })

  }


  render() {
    if (!this.state.imageUrls[0]) {
      return <Text>Loading...</Text>
    }
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{flex: 1}}>
        {/* <Button title = "Button" onPress={() => this.upload()}/> */}
        {/* <TopBar title="Feed" /> */}
        <View style={{backgroundColor: '#BF4949', padding: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Image style={{height: 40, width: 40}} source={require('../img/searchIcon.png')} />
            <TextInput style={{flex: 1, color: '#424242'}} onSubmitEditing={(e) => {
              let tag = e.nativeEvent.text
              this.resetAndSearch(tag)
            }}/>
          </View>
        </View>
        <View style={{flexDirection: 'row', backgroundColor: '#EB5757', padding: 10}}>
          <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}} onPress={()=> {
            Alert.alert("Promoted clicked")
          }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Promoted</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,  justifyContent: 'center', alignItems: 'center'}} onPress={()=> {
            Alert.alert("popular clicked")
          }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Popular</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{
          flex: 1
        }}>
        {
          //this.state.cards;
          //this.test()

        }
          {this.state.songName[0] ? <Card callback={this.callback.bind(this)} ref="0" id="0" mp3={this.songUrls[0]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[0]} tags={[" #first", " #second"]} creator={this.state.creatorNames[0]} cover={this.state.imageUrls[0]}/> : null}
          {this.state.songName[1] ? <Card callback={this.callback.bind(this)} ref="1" id="1" mp3={this.songUrls[1]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[1]} tags={[" #first", " #second"]} creator={this.state.creatorNames[1]} cover={this.state.imageUrls[1]}/> : null}
          {this.state.songName[2] ? <Card callback={this.callback.bind(this)} ref="2" id="2" mp3={this.songUrls[2]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[2]} tags={[" #first", " #second"]} creator={this.state.creatorNames[2]} cover={this.state.imageUrls[2]}/> : null}
          {this.state.songName[3] ? <Card callback={this.callback.bind(this)} ref="3" id="3" mp3={this.songUrls[3]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[3]} tags={[" #first", " #second"]} creator={this.state.creatorNames[3]} cover={this.state.imageUrls[3]}/> : null}
          {this.state.songName[4] ? <Card callback={this.callback.bind(this)} ref="4" id="4" mp3={this.songUrls[4]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[4]} tags={[" #first", " #second"]} creator={this.state.creatorNames[4]} cover={this.state.imageUrls[4]}/> : null}
          {this.state.songName[5] ? <Card callback={this.callback.bind(this)} ref="5" id="5" mp3={this.songUrls[5]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[5]} tags={[" #first", " #second"]} creator={this.state.creatorNames[5]} cover={this.state.imageUrls[5]}/> : null}
          {this.state.songName[6] ? <Card callback={this.callback.bind(this)} ref="6" id="6" mp3={this.songUrls[6]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[6]} tags={[" #first", " #second"]} creator={this.state.creatorNames[6]} cover={this.state.imageUrls[6]}/> : null}
          {this.state.songName[7] ? <Card callback={this.callback.bind(this)} ref="7" id="7" mp3={this.songUrls[7]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[7]} tags={[" #first", " #second"]} creator={this.state.creatorNames[7]} cover={this.state.imageUrls[7]}/> : null}
          {this.state.songName[8] ? <Card callback={this.callback.bind(this)} ref="8" id="8" mp3={this.songUrls[8]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[8]} tags={[" #first", " #second"]} creator={this.state.creatorNames[8]} cover={this.state.imageUrls[8]}/> : null}
          {this.state.songName[9] ? <Card callback={this.callback.bind(this)} ref="9" id="9" mp3={this.songUrls[9]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[9]} tags={[" #first", " #second"]} creator={this.state.creatorNames[9]} cover={this.state.imageUrls[9]}/> : null}
          {this.state.songName[10] ? <Card callback={this.callback.bind(this)} ref="10" id="10" mp3={this.songUrls[10]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[10]} tags={[" #first", " #second"]} creator={this.state.creatorNames[10]} cover={this.state.imageUrls[10]}/> : null}
          {this.state.songName[11] ? <Card callback={this.callback.bind(this)} ref="11" id="11" mp3={this.songUrls[11]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[11]} tags={[" #first", " #second"]} creator={this.state.creatorNames[11]} cover={this.state.imageUrls[11]}/> : null}
          {this.state.songName[12] ? <Card callback={this.callback.bind(this)} ref="12" id="12" mp3={this.songUrls[12]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[12]} tags={[" #first", " #second"]} creator={this.state.creatorNames[12]} cover={this.state.imageUrls[12]}/> : null}
          {this.state.songName[13] ? <Card callback={this.callback.bind(this)} ref="13" id="13" mp3={this.songUrls[13]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[13]} tags={[" #first", " #second"]} creator={this.state.creatorNames[13]} cover={this.state.imageUrls[13]}/> : null}
          {this.state.songName[14] ? <Card callback={this.callback.bind(this)} ref="14" id="14" mp3={this.songUrls[14]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[14]} tags={[" #first", " #second"]} creator={this.state.creatorNames[14]} cover={this.state.imageUrls[14]}/> : null}
          {this.state.songName[15] ? <Card callback={this.callback.bind(this)} ref="15" id="15" mp3={this.songUrls[15]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[15]} tags={[" #first", " #second"]} creator={this.state.creatorNames[15]} cover={this.state.imageUrls[15]}/> : null}
          {this.state.songName[16] ? <Card callback={this.callback.bind(this)} ref="16" id="16" mp3={this.songUrls[16]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[16]} tags={[" #first", " #second"]} creator={this.state.creatorNames[16]} cover={this.state.imageUrls[16]}/> : null}
          {this.state.songName[17] ? <Card callback={this.callback.bind(this)} ref="17" id="17" mp3={this.songUrls[17]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[17]} tags={[" #first", " #second"]} creator={this.state.creatorNames[17]} cover={this.state.imageUrls[17]}/> : null}
          {this.state.songName[18] ? <Card callback={this.callback.bind(this)} ref="18" id="18" mp3={this.songUrls[18]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[18]} tags={[" #first", " #second"]} creator={this.state.creatorNames[18]} cover={this.state.imageUrls[18]}/> : null}
          {this.state.songName[19] ? <Card callback={this.callback.bind(this)} ref="19" id="19" mp3={this.songUrls[19]} iconMaker={iconMaker} navigation={this.props.navigation} songName={this.state.songName[19]} tags={[" #first", " #second"]} creator={this.state.creatorNames[19]} cover={this.state.imageUrls[19]}/> : null}

        </ScrollView>
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Feed);
