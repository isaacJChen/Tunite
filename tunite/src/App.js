import React, {Component} from 'react';
import './App.css';
import {HashRouter as Router, Switch, Redirect, Route} from 'react-router-dom';

import firebase from "firebase/app";
import 'firebase/storage'

import Wavesurfer from 'react-wavesurfer';
import Row from './components/row';
import MainPage from './components/mainPage';
import SigninPage from './components/Signin'

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
      <Router>
        <Switch>
          <Route exact path={"/"} component={SigninPage}/>
          <Route exact path={"/main"} component={MainPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
