import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, Dimensions, Image, ScrollView, StyleSheet, ImageBackground, TouchableHighlight, Alert } from 'react-native';

class Follow extends Component {
  render() {
    return (
      <View>
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
        <Text style={styles.ContactComponent}>{this.props.facebook}</Text>
        <Text style={styles.ContactComponent}>{this.props.twitter}</Text>
        <Text style={styles.ContactComponent}>{this.props.email}</Text>
        <Text style={styles.Contact}>Contact Info</Text>
        <Text style={styles.ContactComponent}>{this.props.bio}</Text>

      </View>
    );
  }
}


export default class Profile extends Component {

  constructor() {
    super();
    this.state = {
      follow: [
        { "following": 23, "followers": 35 },
      ],
      contact: { facebook: "facebook.com/fb", twitter: "twitter.com/tw", email: "email@email.com" },

      bio: "Text about me"
    }
  }

  static navigationOptions = {
    title: 'Profile',
    swipeEnabled: false,
    tabBarIcon: () => (<View style={{height: '100%', width: '100%', alignItems:'center', justifyContent: 'center'}}><Image style={{resizeMode: 'stretch', height: '70%', width: '70%'}} source={require('../img/tabBarIconUser.png')} /><Text style={{color: 'white', fontWeight: 'bold'}}>Profile</Text></View>)
  };


  render() {
    const width = Dimensions.get('window').width / 3;
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <ScrollView >
        <Image
            source={require('../img/an.jpg')}
            style={ styles.backCover }
            blurRadius={5}
          />
        <View style={styles.cover}>
          <Image
            source={require('../img/an.jpg')}
            style={{ width: width, height: width, borderRadius: width / 2 }}
          // blurRadius={2}
          />
          <Text style={styles.name}>Name</Text>
          <Follow followers={23} following={35} />
          <View style={styles.profileOptions}>
            <TouchableHighlight
              onPress={() => {
                Alert.alert('You tapped the button!');
              }}
            >
              <Text style={{ fontSize: 20 }}>Logout</Text>
            </TouchableHighlight>
            <Text>             </Text>
            <TouchableHighlight
              onPress={() => {
                Alert.alert('You tapped the button!');
              }}
            >
              <Text style={{ fontSize: 20 }}>Uploads</Text>
            </TouchableHighlight>
          </View>

          {/* <Text style={styles.follow}>23{"\n"}FOLLOWers</Text> */}
          {/* <Button onPress={() => this.props.navigation.navigate('Collection')}
          title="Button"
        /> */}
        </View>

        <Info facebook={this.state.contact.facebook} twitter={this.state.contact.twitter} email={this.state.contact.email} bio={this.state.bio} />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  cover: {
    height: 275,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "bold"
  },
  follow: {
    textAlign: 'center',
    fontWeight: "bold"
  },
  followSep: {
    fontSize: 30,
    fontWeight: "bold"
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
    margin: 15,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 20,
    position: 'absolute',
    top: 235,
  },
  backCover: {
    position: 'absolute',
    top: 0,
    height: 275
  }
});
