import React, {Component} from 'react';
import './App.css';

import firebase from "firebase/app";
import 'firebase/storage'

import Wavesurfer from 'react-wavesurfer';
import Row from './components/row';
import MainPage from './components/mainPage';

class App extends Component {
  constructor(props) {
    super(props);
  }

  // upload() {
  //   if (this.state.file) {
  //     var postData = {
  //       test: "test",
  //       test2: "test2"
  //     };
  //
  //     var newPostKey = firebase.database().ref().child('uploads').push().key;
  //
  //     var updates = {};
  //     updates['/uploads/' + newPostKey] = postData;
  //     firebase.database().ref().update(updates);
  //
  //     var newRef = this.state.storageRef.child(newPostKey);
  //     newRef.put(this.state.file).then(function(snapshot) {});
  //   }
  // }


  componentDidMount() {}

  render() {
    return (
      <MainPage/>
    );
  }
}

export default App;
