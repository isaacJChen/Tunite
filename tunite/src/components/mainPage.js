import React, {Component} from 'react';
import '../App.css';

import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/auth'

import Wavesurfer from 'react-wavesurfer';
import Row from './row';

export default class MainPage extends Component {
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
      pos2: 0,
      link: ""
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

  upload(){
    this.refs.overlay.style.display = "block"
  }

  hide(){
    this.refs.overlay.style.display = "none"
  }

  showImage(evt){
    this.refs.output.src = URL.createObjectURL(evt.target.files[0])
    this.refs.output.style.display = "block"
  }

  componentDidMount() {}

  signout(){
    firebase.auth().signOut().then(() => {
      this.props.history.push("/");
    })
  }

  render() {
    return (
      <div>
        <div ref="overlay" className="overlay">
          <div className="d-flex justify-content-end">
            <label className="text-white mt-3 mr-5" onClick={() => this.hide()}><h3>x</h3></label>
          </div>
          <div className="container mt-5">
            <form action="submit">
              <div className="form-group">
                <label className="text-white" htmlFor="title">Title</label>
                <input className="form-control" id="title" type="text" required/>
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="genre">Genre</label>
                <input className="form-control" id="genre" type="text"/>
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="file">Song File</label>
                <input className="form-control" id="file" type="file" accept=".mp3" required/>
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="file">Cover Photo</label>
                <input className="form-control" id="file" type="file" accept="image/*" onChange={(evt) => this.showImage(evt)} required/>
              </div>
              <div className="d-flex justify-content-between">
                <div className="form-group">
                  <input type="submit" value="Submit"/>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-end">
                    <p className="text-white">Preview</p>
                  </div>
                  <img className="selectedImage" height="200px" ref="output" alt="your image"/>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="jumbotron bg-danger d-flex justify-content-between">
          <div className="display-4">
            <strong className="text-white">
              Tunite
            </strong>
          </div>
          <button className="btn btn-secondary h-50" onClick={() => this.signout()}>
            Sign Out
          </button>
        </div>

        <div className="container">
          <div className="d-flex mb-5">
            <div className="mt-2">
              <strong>
                3 tracks in your collection
              </strong>
            </div>
            <button className="btn btn-secondary ml-5" onClick={()=> this.upload()}>
              Upload original ⇧
            </button>
          </div>
          <Row/>
          <Row/>
          <Row/>
          <div>{this.state.link}</div>
        </div>
      </div>
    );
  }
}
