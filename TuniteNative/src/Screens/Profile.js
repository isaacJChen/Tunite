import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, Dimensions, Image, ScrollView, StyleSheet } from 'react-native';

class Follow extends Component {
  render() {
    return (
      <View style={{ flexDirection:'row' }}>
        <Text style={styles.follow}>{this.props.following}{"\n"}FOLLOWING</Text>
        <Text style={styles.followSep}> | </Text>
        <Text style={styles.follow}>{this.props.followers}{"\n"}FOLLOWERS</Text>
        {/* <Text>23{"\n"}FOLLOWING</Text> */}
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
      ]
    }
  }

  static navigationOptions = {
    title: 'Profile',
  };


  render() {
    const width = Dimensions.get('window').width / 3;
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <ScrollView >
        <View style={styles.cover}>
          <Image
            source={require('../img/cover_art.png')}
            style={{ width: width, height: width, borderRadius: width / 2 }}
          // blurRadius={2}
          />
          <Text style={styles.name}>Name</Text>
          <Follow followers={23} following={35}/>
          {/* <Text style={styles.follow}>23{"\n"}FOLLOWers</Text> */}
          {/* <Button onPress={() => this.props.navigation.navigate('Collection')}
          title="Button"
        /> */}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  cover: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  name: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 8,
  },
  follow: {
    textAlign: 'center',
  },
  followSep: {
    fontSize: 30
  }
});
