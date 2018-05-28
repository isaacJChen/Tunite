import React, {Component} from 'react';
import '../App.css';

import firebase from "firebase/app";
import 'firebase/storage'

import Wavesurfer from 'react-wavesurfer';

export default class Row extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      storageRef: firebase.storage().ref(),
      imageUrl: undefined,
      songUrl: undefined,
      songFile: undefined,
    }
  }

  // download(e) {
  //   e.preventDefault()
  // }

  componentDidMount() {

    this.state.storageRef.child(this.props.songKey).getDownloadURL().then((url) => {
      // This can be downloaded directly:
      console.log(url);

      let xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event)=> {
        event.preventDefault()
        let blob = xhr.response;
        blob.lastModifiedDate = new Date()
        blob.name = this.props.songKey
        //console.log(blob);
        let urlBlob = window.URL.createObjectURL(blob)
        this.setState({dlUrl: urlBlob})
      };
      xhr.open('GET', url);
      xhr.send();
    }).catch(function(error) {
      // Handle any errors
      console.log("error: " + error);
    });

    firebase.database().ref('uploads/'+ this.props.songKey+'/collaborators').once('value').then((snapshot)=>{
      let collaborators = snapshot.val()
      let names = Object.values(collaborators)
      this.setState({collaborators: names})
    })

    firebase.storage().ref().child(this.props.imageKey).getDownloadURL().then((imgurl) => {
      // `url` is the download URL for 'images/stars.jpg'
      this.setState({imageUrl: imgurl})
      firebase.storage().ref().child(this.props.songKey).getDownloadURL().then((songUrl) => {
        this.setState({songUrl: songUrl})
      }).catch(function(error) {
        alert(error.toString())
      })
    }).catch(function(error) {
      // Handle any errors
      alert(error.toString())
    });
  }

  play() {
    this.refs.playbtn.blur()
    if (this.state.playing) {
      this.refs.song.pause()
    } else {
      this.refs.song.play()
    }
    this.setState({
      playing: !this.state.playing
    })
  }

  upload() {
    this.refs.overlay.style.display = "block"
  }

  hide() {
    this.refs.overlay.style.display = "none"
  }

  showImage(evt) {
    this.refs.output.src = URL.createObjectURL(evt.target.files[0])
    this.refs.output.style.display = "block"
  }

  tagsToString() {
    let tagsString = ""
    for (let key in this.props.tags) {
      tagsString += (this.props.tags[key] + " ")
    }
    return tagsString
  }


  submitChild(evt){
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
    firebase.database().ref().update(tagData);


    let imageKey = firebase.database().ref().child('uploads').push().key;
    firebase.database().ref().child('uploads').child(imageKey).remove()
    let newImageRef = this.state.storageRef.child(imageKey)
    newImageRef.put(this.refs.imageinput.files[0]).then(function(snapshot) {})

    let collaborators = {owner:firebase.auth().currentUser.uid}
    for (let idx in this.state.collaborators) {
      collaborators[this.state.collaborators[idx]] = this.state.collaborators[idx]
    }

    let postData = {
      owner: firebase.auth().currentUser.uid,
      songName: this.refs.title.value,
      tags: {
      },
      timeStamp: now,
      image: imageKey,
      collectionCount: 0,
      promoted: false,
      root: this.props.songKey,
      collaborators:collaborators
    };

    delete postData.collaborators[postData.collaborators.owner]

    postData.tags[this.refs.tag.value] = "#" + this.refs.tag.value
    postData.tags["seattle"] = "#seattle"
    postData.tags[this.props.userName] = "#"+this.props.userName

    let updates = {};
    updates['/uploads/' + newPostKey] = postData;
    firebase.database().ref().update(updates)
    this.hide()
    this.refs.title.value = ""
    this.refs.tag.value = ""

  }

  render() {
    if (!this.state.songUrl) {
      return (
        <div>loading song...</div>
      )
    }
    return (
      <div className="d-flex justify-content-between mb-2">
        <div ref="overlay" className="overlay">
          <div className="d-flex justify-content-end">
            <label className="text-white mt-3 mr-5" onClick={() => this.hide()}><h3>x</h3></label>
          </div>
          <div className="container mt-5">
            <form action="submit" onSubmit={(evt)=>this.submitChild(evt)}>
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


        <div className="d-flex">
          <button ref="playbtn" onClick={(evt) => this.play()} className="btn mr-4 playbtn">{this.state.playing
              ? "❚❚"
              : "►"}</button>
          <audio ref="song">
            <source src={this.state.songUrl} type="audio/mp3"/>
            audio element is not supported in your browser
          </audio>
          <img className="circular-image mr-4" width="50" height="50" src={this.state.imageUrl} alt="head"/>
          <div className="credit">
            <div>
              {this.props.songName}
            </div>
            <font className="text-left" size="2">{this.tagsToString()}</font>
          </div>
        </div>
        {/* <form action="">
          <input type="file" id="audio" accept=".mp3" onChange= {(e) => this.loadSong(e)}/>
        </form> */}

        {/* <button onClick={() => this.handleTogglePlay()}>{this.state.playing
            ? "pause"
            : "play"}</button> */}

        {/* <div>
          <Wavesurfer audioFile={this.state.src} pos={this.state.pos} onPosChange={(e) => this.handlePosChange(e)} playing={this.state.playing}/>
        </div> */}
        <div className="d-flex">
          <div className="ml-4">
            <button className="btn btn-danger" onClick={() => this.upload()}>New Version ⇧</button>
          </div>

          <div className="ml-4">
            <a className="btn btn-danger" href={this.state.dlUrl} download>Download ⇩</a>
          </div>
        </div>
      </div>
    )
  }
}
