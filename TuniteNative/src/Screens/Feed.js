import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
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
      databaseRef: firebase.database().ref()
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
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="Life" tags={[" #John", " #Seattle"]} creator="John" cover='https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&dpr=2&h=350'/>
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="I Love Music" tags={[" #Alex", " #Chicago"]} creator="Alex" cover='https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350'/>
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="Title3" tags={[" #first", " #second"]} creator="Jenny" cover='https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426'/>
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="Title4" tags={[" #first", " #second"]} creator="Peter" cover='https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350'/>
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="Title5" tags={[" #first", " #second"]} creator="annie" cover='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUPfdxYQ86K60b7zbZCz6pgjoobkXab0rul1lt4F_UEQIgTCvOA'/>
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="Title6" tags={[" #first", " #second"]} creator="Kieth" cover='https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&h=350'/>
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="Title7" tags={[" #first", " #second"]} creator="Jake" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="Title8" tags={[" #first", " #second"]} creator="Pete" cover='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16GXbnlaGF7Bb2VQzMFE0E4WX1iMWkJ6ajvZtXmR3e9MZFss3KQ'/>
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="Title9" tags={[" #first", " #second"]} creator="Sarah123" cover='https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg'/>
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="Title10" tags={[" #first", " #second"]} creator="Mat" cover='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAtFNLmy1EJyy3KJdNDBmv-4vvSB59OYtCNbs2RInZJ4Opj5ktRQ'/>
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="Title11" tags={[" #first", " #second"]} creator="Dan" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card iconMaker={iconMaker} navigation={this.props.navigation} songName="Title12" tags={[" #first", " #second"]} creator="Rex" cover='https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&h=350'/>
        </ScrollView>
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Feed);
