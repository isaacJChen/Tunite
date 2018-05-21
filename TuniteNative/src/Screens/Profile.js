import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, Dimensions, Image, ScrollView, StyleSheet, ImageBackground, TouchableHighlight, Alert } from 'react-native';
import * as firebase from "firebase";

class Follow extends Component {
  render() {
    return (
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.follow}>{this.props.following}{"\n"}FOLLOWING</Text>
          <Text style={styles.followSep}> | </Text>
          <Text style={styles.follow}>{this.props.followers}{"\n"}FOLLOWERS</Text>
          {/* <Text>23{"\n"}FOLLOWING</Text> */}

        </View>
      </View>
    );
  }
}

class Info extends Component {
  render() {
    return (
      <View style={{ padding: 20, marginTop: 15 }}>
        <Text style={styles.Contact}>Contact Info</Text>
        <TouchableHighlight
          onPress={() => {
            this.onClick()
          }}
        >
          <Image
            source={require('../img/editIcon.svg')}
            style={{ width: 50, height: 50, backgroundColor: 'pink' }}
          />
        </TouchableHighlight>
        <View style={{ marginLeft: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../img/facebook.png')}
            // style={{ width: width, height: width, borderRadius: width / 2 }}
            />
            <Text style={styles.ContactComponent}>{this.props.facebook}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../img/twitter.png')}
            // style={{ width: width, height: width, borderRadius: width / 2 }}
            />
            <Text style={styles.ContactComponent}>{this.props.twitter}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../img/soundcloud.png')}
            // style={{ width: width, height: width, borderRadius: width / 2 }}
            />
            <Text style={styles.ContactComponent}>{this.props.email}</Text>
          </View>
        </View>
        <Text style={styles.Contact}>Bio</Text>
        <Text style={styles.ContactComponent}>{this.props.bio}</Text>
      </View>
    );
  }
}


export default class Profile extends Component {

  constructor() {
    super();
    this.state = {
      followers: 0,
      following: 0,
      contact: { faceBook: "bad", twitter: "bad", soundCloud: "bad" },
      image: "",
      bio: "",
      name: "",
    }
  }

  componentDidMount() {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/bio').once('value').then((snapshot) => {
      let bio = snapshot.val()
      this.setState({ bio: bio })
    })

    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/contactInfo').once('value').then((snapshot) => {
      let data = snapshot.val()
      this.setState({ contact: data })
    })

    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/userName').once('value').then((snapshot) => {
      let name = snapshot.val()
      this.setState({ name: name })
    })

    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/followers').once('value').then((snapshot) => {
      let num = Object.keys(snapshot.val()).length - 1
      this.setState({ followers: num })
    })

    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/following').once('value').then((snapshot) => {
      let num = Object.keys(snapshot.val()).length - 1
      this.setState({ following: num })
    })

    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/image').once('value').then((snapshot) => {
      let img = snapshot.val()
      if (img == undefined) {
        img = "http://identicon-1132.appspot.com/" + firebase.auth().currentUser.uid
        this.setState({ image: img })
      }
    })
  }

  static navigationOptions = {
    title: 'Profile',
    swipeEnabled: false,
    header: null,
    tabBarIcon: () => (<View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}><Image style={{ resizeMode: 'stretch', height: '70%', width: '70%' }} source={require('../img/tabBarIconUser.png')} /><Text style={{ color: 'white', fontWeight: 'bold' }}>Profile</Text></View>)
  };


  render() {
    const width = Dimensions.get('window').width / 3;
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <ScrollView >
        <Image
          source={{ uri: this.state.image }}
          style={styles.backCover}
          blurRadius={1}
        />
        <View style={styles.cover}>
          <Image
            source={{ uri: this.state.image }}
            style={{ width: width, height: width, borderRadius: width / 2 }}
          // blurRadius={2}
          />
          <Text style={styles.name}>{this.state.name}</Text>
          <Follow followers={this.state.followers} following={this.state.following} />
          <View style={styles.profileOptions}>
            <TouchableHighlight
              onPress={() => {
                Alert.alert('You tapped the button!');
              }}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../img/adduser.png')}
                  style={{}}
                />
                <Text style={{ fontSize: 15, color: 'white' }}>Follow</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                Alert.alert('You tapped the button!');
              }}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../img/musicIcon.png')}
                  style={{}}
                />
                <Text style={{ fontSize: 15, color: 'white' }}>Uploads</Text>
              </View>
            </TouchableHighlight>
          </View>

          {/* <Text style={styles.follow}>23{"\n"}FOLLOWers</Text> */}
          {/* <Button onPress={() => this.props.navigation.navigate('Collection')}
          title="Button"
        /> */}
        </View>

        <Info facebook={this.state.contact.faceBook} twitter={this.state.contact.twitter} email={this.state.contact.soundCloud} bio={this.state.bio} />
      </ScrollView>
    );
  }
};

const width = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
  cover: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "bold",
    color: 'white'
  },
  follow: {
    textAlign: 'center',
    fontWeight: "bold",
    color: 'white'
  },
  followSep: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'white',
    marginLeft: 30,
    marginRight: 30
  },
  Contact: {
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold'
  },
  ContactComponent: {
    fontSize: 15,
    padding: 5,
    marginLeft: 5
  },
  profileOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#EB5757',
    borderRadius: 20,
    position: 'absolute',
    top: 260,
    width: width,
    paddingTop: 5,
    paddingBottom: 5
  },
  backCover: {
    position: 'absolute',
    top: 0,
    height: 300,
    width: '100%'
  }
});
