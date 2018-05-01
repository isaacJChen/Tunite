import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import Card from '../Components/Card';
import TopBar from '../Components/TopBar'
import SearchBar from '../Components/SearchBar'
import * as firebase from "firebase";


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
    tabBarIcon: () => (<View style={{height: '100%', width: '100%', alignItems:'center', justifyContent: 'center'}}><Image style={{height: '70%', width: '70%'}} source={require('../img/tabBarIconHome.png')} /><Text style={{color: 'white', fontWeight: 'bold'}}>Home</Text></View>)
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
          <Card navigation={this.props.navigation} songName="Title1" tags={[" #first", " #second"]} creator="Jhon" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card navigation={this.props.navigation} songName="Title2" tags={[" #first", " #second"]} creator="Alex" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card navigation={this.props.navigation} songName="Title3" tags={[" #first", " #second"]} creator="Jenny" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card navigation={this.props.navigation} songName="Title4" tags={[" #first", " #second"]} creator="Peter" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card navigation={this.props.navigation} songName="Title5" tags={[" #first", " #second"]} creator="annie" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card navigation={this.props.navigation} songName="Title6" tags={[" #first", " #second"]} creator="Kieth" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card navigation={this.props.navigation} songName="Title7" tags={[" #first", " #second"]} creator="Jake" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card navigation={this.props.navigation} songName="Title8" tags={[" #first", " #second"]} creator="Pete" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card navigation={this.props.navigation} songName="Title9" tags={[" #first", " #second"]} creator="Sarah123" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card navigation={this.props.navigation} songName="Title10" tags={[" #first", " #second"]} creator="Mat" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card navigation={this.props.navigation} songName="Title11" tags={[" #first", " #second"]} creator="Dan" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card navigation={this.props.navigation} songName="Title12" tags={[" #first", " #second"]} creator="Rex" cover='https://facebook.github.io/react/logo-og.png'/>
        </ScrollView>
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Feed);
