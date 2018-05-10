import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, ScrollView, StatusBar, TouchableOpacity, Image, Alert } from 'react-native';
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
      current: "data from parent"
    };
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

  callback(){
    // Alert.alert("hi");
    // if (this.state.current !== "") {
    //   this.refs[this.state.current].refs.player.setState({
    //     playing: false
    //   });
    // }
    // this.setState({
    //   current: x
    // })


  }

  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{flex: 1}}>
        {/* <Button title = "Button" onPress={() => this.upload()}/> */}
        {/* <TopBar title="Feed" /> */}
        <SearchBar />
        <View style={{flexDirection: 'row', backgroundColor: '#EB5757', padding: 10}}>
          <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Promoted</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,  justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Popular</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{
          flex: 1
        }}>
          <Card callback={this.callback} ref="1" id="1" mp3="../mp3/m.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title1" tags={[" #first", " #second"]} creator="Jhon" cover='https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg'/>
          <Card callback={this.callback} ref="2" id="2" mp3="../mp3/s.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title2" tags={[" #first", " #second"]} creator="Alex" cover='https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg'/>
          <Card callback={this.callback} ref="3" id="3" mp3="../mp3/m.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title3" tags={[" #first", " #second"]} creator="Jenny" cover='https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426'/>
          <Card callback={this.callback} ref="4" id="4" mp3="../mp3/s.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title4" tags={[" #first", " #second"]} creator="Peter" cover='https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350'/>
          <Card callback={this.callback} ref="5" id="5" mp3="../mp3/m.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title5" tags={[" #first", " #second"]} creator="annie" cover='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUPfdxYQ86K60b7zbZCz6pgjoobkXab0rul1lt4F_UEQIgTCvOA'/>
          <Card callback={this.callback} ref="6" id="6" mp3="../mp3/s.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title6" tags={[" #first", " #second"]} creator="Kieth" cover='https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&h=350'/>
          <Card callback={this.callback} ref="7" id="7" mp3="../mp3/m.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title7" tags={[" #first", " #second"]} creator="Jake" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card callback={this.callback} ref="8" id="8" mp3="../mp3/s.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title8" tags={[" #first", " #second"]} creator="Pete" cover='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16GXbnlaGF7Bb2VQzMFE0E4WX1iMWkJ6ajvZtXmR3e9MZFss3KQ'/>
          <Card callback={this.callback} ref="9" id="9" mp3="../mp3/m.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title9" tags={[" #first", " #second"]} creator="Sarah123" cover='https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg'/>
          {/* <Card callback={this.callback} ref="10" id="10" mp3="../mp3/s.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title10" tags={[" #first", " #second"]} creator="Mat" cover='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAtFNLmy1EJyy3KJdNDBmv-4vvSB59OYtCNbs2RInZJ4Opj5ktRQ'/>
          <Card callback={this.callback} ref="11" id="11" mp3="../mp3/m.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title11" tags={[" #first", " #second"]} creator="Dan" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card callback={this.callback} ref="12" id="12" mp3="../mp3/s.mp3" iconMaker={iconMaker} navigation={this.props.navigation} songName="Title12" tags={[" #first", " #second"]} creator="Rex" cover='https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&h=350'/> */}

        </ScrollView>
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Feed);
