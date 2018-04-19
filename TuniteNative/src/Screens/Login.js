import React, { Component } from 'react';
import {View, StyleSheet, TextInput, Text, Button} from 'react-native'

export default class Login extends Component{
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style = {styles.container}>
        <View></View>

        <View>
          <Text>
            Login
          </Text>
        </View>

        <View style={styles.inputForm}>
          <View><TextInput placeholder="email" placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
          <View><TextInput placeholder="password" secureTextEntry placeholderTextColor="rgba(255,255,255,0.7)" style={styles.input}/></View>
          <Button title="Login" onPress={() => {}}/>
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
