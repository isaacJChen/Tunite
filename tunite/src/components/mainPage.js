import React, {Component} from 'react';
import '../App.css';

import firebase from "firebase/app";
import 'firebase/storage'

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

  download() {
    this.state.storageRef.child('-LA5WiNFP0x4D5WUQDPU').getDownloadURL().then( (url) => {
      // `url` is the download URL for 'images/stars.jpg'
      console.log("url: " + url);
      this.setState({
        link:  url
      })
      // This can be downloaded directly:

      // Or inserted into an <img> element:
      // var img = document.getElementById('myimg');
      // img.src = url;
    }).catch(function(error) {
      // Handle any errors
      console.log("error: " + error);
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

  render() {
    return (
      <div>
        <div ref="overlay" className="overlay">
          <div className="d-flex justify-content-end">
            <label className="text-white mt-3 mr-5" onClick={() => this.hide()}><h3>x</h3></label>
          </div>
          <div className="container mt-5">
            <form action="submit">
              <div class="form-group">
                <label className="text-white" for="title">Title</label>
                <input class="form-control" id="title" type="text" required/>
              </div>
              <div class="form-group">
                <label className="text-white" for="genre">Genre</label>
                <input class="form-control" id="genre" type="text"/>
              </div>
              <div class="form-group">
                <label className="text-white" for="file">Song File</label>
                <input class="form-control" id="file" type="file" accept=".mp3" required/>
              </div>
              <div class="form-group">
                <label className="text-white" for="file">Cover Photo</label>
                <input class="form-control" id="file" type="file" accept="image/*" onChange={(evt) => this.showImage(evt)} required/>
              </div>
              <div className="d-flex justify-content-between">
                <div class="form-group">
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
          <button className="btn btn-secondary h-50">
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
