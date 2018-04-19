import React, {Component} from 'react';
import './App.css';

import firebase from "firebase/app";
import 'firebase/storage'

import Wavesurfer from 'react-wavesurfer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: undefined,
      src: "",
      src2: "",
      storageRef: firebase.storage().ref(),
      databaseRef: firebase.database().ref(),
      playing: false,
      pos: 0,
      pos2: 0
    };
  }

  loadSong(e) {
    if (e.target.files[0]) {
      this.setState({
        src: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
        playing: false,
        pos: 0,
        pos2: 0
      })

    }
  }

  handlePosChange(e) {
    this.setState({pos2: e.originalArgs[0], pos: e.originalArgs[0]});
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }

  upload() {
    if (this.state.file) {
      var postData = {
        test: "test",
        test2: "test2"
      };

      var newPostKey = firebase.database().ref().child('uploads').push().key;

      var updates = {};
      updates['/uploads/' + newPostKey] = postData;
      firebase.database().ref().update(updates);


      var newRef = this.state.storageRef.child(newPostKey);
      newRef.put(this.state.file).then(function(snapshot) {});
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className="px-5">
        <div>song 1</div>
        <form action="">
          <input type="file" id="audio" accept=".mp3" onChange= {(e) => this.loadSong(e)}/>
        </form>

        <button onClick={() => this.handleTogglePlay()}>{this.state.playing
            ? "pause"
            : "play"}</button>

        <div>song 1</div>
        <div>
          <Wavesurfer audioFile={this.state.src} pos={this.state.pos} onPosChange={(e) => this.handlePosChange(e)} playing={this.state.playing}/>
        </div>

        <div>
          <button className="" onClick={() => this.upload()}>Upload to cloud</button>
        </div>

      </div>
    );
  }
}

export default App;
