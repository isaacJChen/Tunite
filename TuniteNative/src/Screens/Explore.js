import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, Image, ScrollView, Dimensions, TouchableNativeFeedback, FlatList, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Tag from '../Components/Tag';
import MusicPlayer from '../Components/MusicPlayer';
import Coverflow from 'react-native-coverflow';


export default class Explore extends Component {
  constructor(){
    super();
    this.state = {
        tags: [
            { "image": "Gateway", "tag": "#john", "follow": true },
            { "image": "Monster", "tag": "#jim", "follow": false },
            { "image": "Slam", "tag": "#will", "follow": true }
        ]
    }
  }
  render() {
    return(
      <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-between'}}>

        <Coverflow style={{flex:1}} onChange={(index) => console.log('Current item', index)}>
          <View><Image style={{height:300, width:300}} source={require('../img/custom-album-cover.jpg')}/></View>
          <View><Image style={{height:300, width:300}} source={require('../img/custom-album-cover.jpg')}/></View>
          <View><Image style={{height:300, width:300}} source={require('../img/custom-album-cover.jpg')}/></View>
          <View><Image style={{height:300, width:300}} source={require('../img/custom-album-cover.jpg')}/></View>
          <View><Image style={{height:300, width:300}} source={require('../img/custom-album-cover.jpg')}/></View>
        </Coverflow>




        <View style={{flexDirection: 'row', marginLeft: 30, marginRight:30, marginBottom:30}}>
          <Tag tag={this.state.tags[0].tag}/>
          <Tag tag={this.state.tags[0].tag}/>
          <Tag tag={this.state.tags[0].tag}/>
        </View>


        <View style={{flexDirection: 'row', marginLeft: 30, marginRight:30, marginBottom:30}}>
          <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../img/save-btn.png')} style={{marginTop: 5, marginBottom: 5}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../img/save-btn.png')} style={{marginTop: 5, marginBottom: 5}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../img/save-btn.png')} style={{marginTop: 5, marginBottom: 5}}/>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}
