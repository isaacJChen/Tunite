import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, ScrollView, StatusBar } from 'react-native';
import Card from '../Components/Card';
import TopBar from '../Components/TopBar'
import SearchBar from '../Components/SearchBar'

export default class Feed extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{flex: 1}}>
        <TopBar title="Feed" />
        <SearchBar />
        <ScrollView style={{
          flex: 1
        }}>
          <Card title="Title1" tags={[" #first", " #second"]} creator="Jhon" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card title="Title2" tags={[" #first", " #second"]} creator="Alex" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card title="Title3" tags={[" #first", " #second"]} creator="Jenny" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card title="Title4" tags={[" #first", " #second"]} creator="Peter" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card title="Title5" tags={[" #first", " #second"]} creator="annie" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card title="Title6" tags={[" #first", " #second"]} creator="Kieth" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card title="Title7" tags={[" #first", " #second"]} creator="Jake" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card title="Title8" tags={[" #first", " #second"]} creator="Pete" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card title="Title9" tags={[" #first", " #second"]} creator="Sarah123" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card title="Title10" tags={[" #first", " #second"]} creator="Mat" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card title="Title11" tags={[" #first", " #second"]} creator="Dan" cover='https://facebook.github.io/react/logo-og.png'/>
          <Card title="Title12" tags={[" #first", " #second"]} creator="Rex" cover='https://facebook.github.io/react/logo-og.png'/>
        </ScrollView>
      </View>


    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Feed);
