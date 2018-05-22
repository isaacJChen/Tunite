import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, Image, TouchableNativeFeedback, TouchableOpacity, Alert } from 'react-native';
import * as firebase from "firebase";

export default class Song extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <TouchableNativeFeedback
        onPress={() => this.props.navigation.navigate('SongDetail', {
        Name: this.props.songName,
        otherParam: 'anything you want here',
        iconMaker: this.props.iconMaker
      })}>

      <View style={{flexDirection:'row', justifyContent: 'space-between', backgroundColor:'white'}}>
        <View>
          <View style={{height: 65, flexDirection: 'row', alignItems:'center', backgroundColor: "white"}}>
            {/* <Image
                source={require('../img/play_icon.png')}
                style={{width: 25, height: 25, borderRadius: 25, marginRight: 7, marginLeft: 7}}
              /> */}
            <Image
                source={{uri: this.props.img}}
                style={{width: 50, height: 50, borderRadius: 25, marginRight: 7, marginLeft: 7}}
              />
              <View style={{marginLeft: 7}} >
                  <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>{this.props.songName}</Text>
                  <Text style={{ color: 'black'}}>{this.props.tagName}</Text>
              </View>
            </View>
        </View>

        <TouchableOpacity style={{backgroundColor: 'white', marginRight: 25, alignItems: 'center', justifyContent: 'center'}} onPress={()=>{
          firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/collection/' + this.props.itemKey).remove()
          firebase.database().ref('uploads/'+this.props.itemKey+'/collectionCount').once('value').then((snapshot)=>{
            let count = snapshot.val()
            let updates = {};
            updates['uploads/'+this.props.itemKey+'/collectionCount'] = count-1;
            firebase.database().ref().update(updates);
          })
        }}>
          <Image source={require('../img/deleteIcon.png')}/>
        </TouchableOpacity>

      </View>
      </TouchableNativeFeedback>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Song);
