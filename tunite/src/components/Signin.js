import React, {Component} from 'react';
import '../App.css';

import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/auth'

export default class SigninPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  componentDidMount(){
    this.authUnsub = firebase.auth().onAuthStateChanged(user => {if(user){
      this.props.history.push("/main");
    }})
  }

  componentWillUnmount(){
      this.authUnsub();
  }

  render() {
    return (
      <div>
        <div className="jumbotron bg-danger d-flex justify-content-between">
          <div className="display-4">
            <strong className="text-white">
              Tunite
            </strong>
          </div>
        </div>
        <div className="container">
          <form action="submit" onSubmit={(evt) => {
            evt.preventDefault()
            firebase.auth().signInWithEmailAndPassword(this.refs.email.value, this.refs.password.value).catch(function(error) {
              alert("Not Authenticated");
            });
          }}>
            <div className="form-group">
              <label htmlFor="mail">Email</label>
              <input ref="email" className="form-control" id="email" type="email" required/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input ref="password" className="form-control" id="password" type="password" required/>
            </div>
            <div className="form-group">
              <input type="submit" value="Signin"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
