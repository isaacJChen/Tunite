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
      link: "",
      collection: [],
      user: {},
    };

    this.rows = []
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

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        firebase.database().ref('users/'+user.uid+'/collection').once('value').then((snapshot)=>{
          let collection = snapshot.val()
          this.rows = []
          firebase.database().ref('uploads/').once('value').then((snapshot)=>{
            let songDatas = snapshot.val()

            firebase.database().ref('users/'+user.uid+"/userName").once('value').then((ss)=>{
              for (let songKey in collection) {
                let tags = songDatas[songKey].tags
                this.rows.push(<Row userName={ss.val()} key={songKey} songKey={songKey} imageKey={songDatas[songKey].image} songName={songDatas[songKey].songName} tags={tags}/>)
              }
              this.setState({collection: this.rows, user:user, userName:ss.val()})
            })
          })
        })
      } else {
      }
    });
  }

  signout(){
    firebase.auth().signOut().then(() => {
      this.props.history.push("/");
    })
  }

  submitOriginal(evt){
    evt.preventDefault()


      // if (this.state.file) {
    let now = Date.now()

    let newPostKey = firebase.database().ref().child('uploads').push().key;

    let newRef = this.state.storageRef.child(newPostKey);
    newRef.put(this.refs.fileinput.files[0]).then(function(snapshot) {});

    let userData = {}
    userData['/users/'+firebase.auth().currentUser.uid+'/uploads/' + newPostKey] = newPostKey
    firebase.database().ref().update(userData);

    let tagData = {}
    tagData['/tags/' + this.refs.tag.value +"/songs/"+ newPostKey] ={
      collectionCount: 0,
      timeStamp: now
    }
    tagData['/tags/seattle/songs/' + newPostKey] = {
      collectionCount: 0,
      timeStamp: now
    }
    tagData['/tags/'+this.state.userName+'/songs/'+newPostKey] = {
      collectionCount: 0,
      timeStamp: now
    }

    firebase.database().ref().update(tagData);


    let imageKey = firebase.database().ref().child('uploads').push().key;
    firebase.database().ref().child('uploads').child(imageKey).remove()
    let newImageRef = this.state.storageRef.child(imageKey)
    newImageRef.put(this.refs.imageinput.files[0]).then(function(snapshot) {})

    let postData = {
      owner: firebase.auth().currentUser.uid,
      songName: this.refs.title.value,
      tags: {
      },
      timeStamp: now,
      image: imageKey,
      collectionCount: 0,
      mostPopularCount: 0,
      mostPopularVersion: newPostKey,
      promoted: true,
      promotedVersion: newPostKey,
      root: newPostKey,
      collaborators: {owner: firebase.auth().currentUser.uid}
    };

    postData.tags[this.refs.tag.value] = "#" + this.refs.tag.value
    postData.tags["seattle"] = "#seattle"
    postData.tags[this.state.userName] = "#"+this.state.userName

    let updates = {};
    updates['/uploads/' + newPostKey] = postData;
    firebase.database().ref().update(updates)
    this.hide()
    this.refs.title.value = ""
    this.refs.tag.value = ""

  }

  render() {
    if (!this.state.user.uid) {
      return(
        <h4>Loading...</h4>
      )
    }
    return (
      <div>
        <div ref="overlay" className="overlay">
          <div className="d-flex justify-content-end">
            <label className="text-white mt-3 mr-5" onClick={() => this.hide()}><h3>x</h3></label>
          </div>
          <div className="container mt-5">
            <form action="submit" onSubmit={(evt)=>this.submitOriginal(evt)}>
              <div className="form-group">
                <label className="text-white" htmlFor="title">Title</label>
                <input ref="title" className="form-control" id="title" type="text" required/>
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="genre">Genre</label>
                <input ref="tag" className="form-control" id="genre" type="text" required/>
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="file">Song File</label>
                <input ref="fileinput" className="form-control" id="file" type="file" accept=".mp3" required/>
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="file">Cover Photo</label>
                <input ref="imageinput"className="form-control" id="file" type="file" accept="image/*" onChange={(evt) => this.showImage(evt)} required/>
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
              Tunite - Web Version
            </strong>
          </div>
          <button className="btn btn-secondary h-50" onClick={() => this.signout()}>
            Sign Out
          </button>
        </div>

        <div className="container">
          <div className="d-flex mb-5">
            <button className="btn btn-secondary ml-5" onClick={()=> this.upload()}>
              Upload original ⇧
            </button>
          </div>
          {this.state.collection}
          <div>{this.state.link}</div>
        </div>
      </div>
    );
  }
}
