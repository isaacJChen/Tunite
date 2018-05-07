import React, {Component} from 'react';
import '../App.css';

import firebase from "firebase/app";
import 'firebase/storage'

import Wavesurfer from 'react-wavesurfer';



export default class Row extends Component{
  constructor(props){
    super(props)
    this.state = {
      playing: false
    }
  }
  play(){
    this.refs.playbtn.blur()
    if (this.state.playing) {
      this.refs.song.pause()
    } else {
      this.refs.song.play()
    }
    this.setState({playing: !this.state.playing})
  }

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

  render(){
    return(
      <div className="d-flex justify-content-between mb-2">
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
        <div className="d-flex">
          <button ref="playbtn" onClick={(evt)=> this.play()} className="btn mr-4 playbtn">{this.state.playing ? "❚❚" : "►"}</button>
          <audio ref="song">
            <source
              src="http://madperfect.com/audio/explosion.mp3"
              type="audio/mp3"
            />
            audio element is not supported in your browser
          </audio>
          <img className="circular-image mr-4" width="50" height="50" src="https://images.pexels.com/photos/669005/pexels-photo-669005.jpeg?auto=compress&cs=tinysrgb&h=350" alt="head"/>
          <div className="credit">
            <div>
              Song Name
            </div>
            <div>
              <font size="2">creator name</font>
            </div>
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
            <button className="btn btn-danger" onClick={() => this.download()}>Download ⇩</button>
          </div>
          <div className="ml-4">
            <button className="btn btn-danger">delete</button>
          </div>
        </div>
      </div>
    )
  }
}
