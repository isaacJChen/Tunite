import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, Image, ScrollView, Dimensions, TouchableNativeFeedback, FlatList, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Tag from '../Components/Tag';
import MusicPlayer from '../Components/MusicPlayer';
import Coverflow from 'react-native-coverflow';


class Song extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false
    }
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
          <Image style={{height: '100%', width: '100%', backgroundColor: 'black'}} source={{uri: this.props.image}}/>
        </View>
        <TouchableOpacity onPress={() => this.setState({playing: !this.state.playing})} style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={this.state.playing ? require('../img/pause.png') : require('../img/roundPlayButton.png')} style={{marginTop: 5, marginBottom: 5}}/>
        </TouchableOpacity>
      </View>
    )
  }
}

export default class Explore extends Component {
  constructor(props){
    super(props);
    var songs = [
      {name: "Bon Jovi"},
      {name: "TSwift"},
      {name: "In Too Deep"},
      {name: "DREAMS"},
      {name: "Avicci"},
      {name: "Bowie"},
      {name: "WAVE~~~"}
    ]
    this.state = {
        tags: [
            { "image": "Gateway", "tag": "#john", "follow": true },
            { "image": "Monster", "tag": "#jim", "follow": false },
            { "image": "Slam", "tag": "#will", "follow": true }
        ],
        currentSong: songs[0].name,
        songs: songs
    }
  }


  static navigationOptions = {
    swipeEnabled: false
  };

  render() {
    return(
      <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-evenly'}}>

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold',}}>{this.state.currentSong}</Text>
        </View>

        <Coverflow style={{height: '45%', width:'100%'}} onChange={(index) => {
          this.setState(
            {currentSong: this.state.songs[index].name}
          )
        }}>
          <Song image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSipPOQ9zpWb7CP25pfxPCZVERljvQNkeYRxjDOMlpfb5ZXiPtCZw'/>
          <Song image='http://i.dailymail.co.uk/i/pix/2017/08/24/21/4383013F00000578-4821102-image-a-77_1503607864789.jpg'/>
          <Song image='https://marketplace.canva.com/MAB6qNBAV-0/1/0/thumbnail_large/canva-in-too-deep-diving-music-album-cover-MAB6qNBAV-0.jpg'/>
          <Song image='http://jaguda.com/wp-content/uploads/2017/09/DJ-Spinall-Dreams.jpg'/>
          <Song image='https://creative-commission-threelanesltd.netdna-ssl.com/system/files/styles/square__600_x_600_/private/artwork/Stories_cover1_Prmd_master2_master.png?itok=_LCCMOcJ'/>
          <Song image='http://www.abc.net.au/news/image/7082048-3x2-940x627.jpg'/>
          <Song image='https://i.kinja-img.com/gawker-media/image/upload/s--_s8eRJFa--/c_scale,fl_progressive,q_80,w_800/qyaz3i8usy1hxfzw3msb.jpg'/>
        </Coverflow>




        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Tag tag={this.state.tags[0].tag}/>
          <Tag tag={this.state.tags[0].tag}/>
          <Tag tag={this.state.tags[0].tag}/>
        </View>


        <View style={{marginLeft: 30, marginRight:30, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
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
