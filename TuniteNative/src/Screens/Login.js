import React, { Component } from 'react';
import {View, StyleSheet, TextInput, Text, Button, Alert} from 'react-native'
import * as firebase from "firebase";

export default class Login extends Component{
  constructor(props) {
    super(props)
    this.state= {
      email:"",
      password:"",
      signUpEmail:"",
      signUpPassword:"",
      signUpusername:""
    }
  }

  render() {
    return (
      <View style = {styles.container}>
        <View></View>

        <View style={styles.inputForm}>
          <View><TextInput onChangeText={(change) => {this.setState({email:change})}} placeholder="email" placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
          <View><TextInput onChangeText={(change) => {this.setState({password:change})}} placeholder="password" secureTextEntry placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
          <Button title="Login" onPress={() => {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
              //handle error
            });
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                this.props.navigation.navigate("SignedIn")
              } else {

              }
            });


          }}/>

          <View><TextInput onChangeText={(change) => {this.setState({signUpusername:change})}} placeholder="username" placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
          <View><TextInput onChangeText={(change) => {this.setState({signUpEmail:change})}} placeholder="email" placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
          <View><TextInput onChangeText={(change) => {this.setState({signUpPassword: change})}} placeholder="password" secureTextEntry placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
          <Button title="SignUp" onPress={() => {
            firebase.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword).catch(function(error) {
              // Handle Errors here.
            });
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {

                var postData = {
                  userName: this.state.signUpusername
                };

                userData = {}
                userData[user.uid] = {userName : this.state.signUpusername}
                userData[user.uid]["following"] = {seattle: "seattle"}
                userData[user.uid]["following"][user.uid] = user.uid
                userData[user.uid]["followers"] = {}
                userData[user.uid]["followers"][user.uid] = user.uid

                userData[user.uid]["contactInfo"] = {}
                userData[user.uid]["contactInfo"]["faceBook"] = "fb"
                userData[user.uid]["contactInfo"]["twitter"]="tw"
                userData[user.uid]["contactInfo"]["soundCloud"]="sc"

                firebase.database().ref().child("users").update(userData);

                this.props.navigation.navigate("SignedIn")
              } else {
              // User is signed out.
              // ...
              }
            });
          }}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  },
  inputForm: {
    paddingHorizontal: 20
  }
})
