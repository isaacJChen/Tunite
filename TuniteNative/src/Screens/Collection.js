import React, { Component } from 'react';
import { AppRegistry, View, Text, FlatList, Image, Alert } from 'react-native';
import Song from '../Components/Song'
import * as firebase from "firebase";

let iconMaker = function() {
  return (<View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}><Image style={{ height: '70%', width: '70%' }} source={require('../img/tabBarIcon1.png')} /><Text style={{ color: 'white', fontWeight: 'bold' }}>Collection</Text></View>)
}

export default class Collection extends Component {
  constructor() {
    super();
    this.state = {
      list: [

      ]
    }
  }

  static navigationOptions = {
    title: 'Collection',
    swipeEnabled: false,
    tabBarIcon: iconMaker,
    headerStyle: { backgroundColor: '#BF4949' },
    headerTitleStyle: { color: 'white' },
  };

  renderSeparator = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "black" }}
      />
    )
  }

  componentDidMount() {
    let ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/collection').on('value', (snapshot) =>{
      let val = snapshot.val()
      if (!val) {
        this.setState({list:[]})
      } else {
        let collection = Object.keys(snapshot.val())

        let list = []
        for (idx in collection) {
          let key = collection[idx]
          firebase.database().ref('uploads/' +key).once('value').then((snapshot)=>{
            let songProfile = snapshot.val()

            firebase.storage().ref().child(songProfile.image).getDownloadURL().then( (url) => {
              // `url` is the download URL for 'images/stars.jpg'
              let item = {
                name: songProfile.songName,
                tag: songProfile.tags['seattle'],
                img: url,
                key: key
              }

              list.push(item)
              this.setState({list: list})

            }).catch(function(error) {
              // Handle any errors
              Alert.alert(error.toString())
            });

          })
        }
      }
    })

  }

  render() {
    return (
      <View >

        <FlatList
          data={this.state.list}
          renderItem={({ item }) => (
            <Song itemKey={item.key} img={item.img} iconMaker={iconMaker} songName={item.name} tagName={item.tag} navigation={this.props.navigation} />
          )}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
};



// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => Collection);
