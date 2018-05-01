import React, { Component } from 'react';
import {View, StyleSheet, TextInput, Text, Button} from 'react-native'
import * as firebase from "firebase";

// export default class Login extends Component{
//   render() {
//     return (
//       // Try setting `alignItems` to 'flex-start'
//       // Try setting `justifyContent` to `flex-end`.
//       // Try setting `flexDirection` to `row`.
//
//     );
//   }
// }
export default ({ navigation }) => (
  <View style = {styles.container}>
    <View></View>

    <View style={styles.inputForm}>
      <View><TextInput onChangeText={(change) => {email = change}} placeholder="email" placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
      <View><TextInput onChangeText={(change) => {password = change}} placeholder="password" secureTextEntry placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
      <Button title="Login" onPress={() => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          //handle error
        });
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            navigation.navigate("SignedIn")
          } else {
          // User is signed out.
          // ...
          }
        });
      }}/>

      <View><TextInput onChangeText={(change) => {signUpusername = change}} placeholder="username" placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
      <View><TextInput onChangeText={(change) => {signUpEmail = change}} placeholder="email" placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
      <View><TextInput onChangeText={(change) => {signUpPassword = change}} placeholder="password" secureTextEntry placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
      <Button title="SignUp" onPress={() => {
        firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword).catch(function(error) {
          // Handle Errors here.
        });
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {

            var postData = {
              userName: signUpusername
            };

            userData = {}
            userData[user.uid] = {userName : signUpusername}

            firebase.database().ref().child("users").update(userData);

            navigation.navigate("SignedIn")
          } else {
          // User is signed out.
          // ...
          }
        });
      }}/>
    </View>
  </View>
);

let email = ""
let password = ""

let signUpEmail = ""
let signUpPassword = ""
let signUpusername = ""

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
