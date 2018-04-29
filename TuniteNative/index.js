import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import {SignedIn, createRootNavigator} from './App';
import * as firebase from "firebase";
import Login from './src/Screens/Login'

console.disableYellowBox = true;
var config = {
  apiKey: "AIzaSyBntJVZJU-Qvnmk6KTiRISRojGeqj3DuX4",
  authDomain: "tunite-3a985.firebaseapp.com",
  databaseURL: "https://tunite-3a985.firebaseio.com",
  projectId: "tunite-3a985",
  storageBucket: "tunite-3a985.appspot.com",
  messagingSenderId: "208605072574"
};
firebase.initializeApp(config);


export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  // componentDidMount() {
  //   isSignedIn()
  //     .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
  //     .catch(err => alert("An error occurred"));
  // }

  render() {
    //const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    // if (!checkedSignIn) {
    //   return null;
    // }

    const Layout = createRootNavigator(false);
    return <Layout />;
  }
}



AppRegistry.registerComponent('TuniteNative', () => Index);
