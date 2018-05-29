import React, { Component } from 'react';
import { AppRegistry, View, Text, FlatList, Image, Alert, TouchableNativeFeedback } from 'react-native';
import Song from '../Components/Song'
import * as firebase from "firebase";

let iconMaker = function () {
  return (<View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}><Image style={{ height: '70%', width: '70%' }} source={require('../img/tabBarIcon1.png')} /><Text style={{ color: 'white', fontWeight: 'bold' }}>Collection</Text></View>)
}

class Upload extends Component {
  constructor() {
    super()
    this.state = {
      songUrl: "",
      coverUrl: ""
    }
  }

  onClick() {
    // Alert.alert(this.props.itemKey)
    firebase.database().ref('uploads/' + this.props.itemKey + '/image').once('value').then((snapshot) => {
      let val = snapshot.val();
      firebase.storage().ref().child(val).getDownloadURL().then((url) => {
        this.setState({
          coverUrl: url
        })
        firebase.storage().ref().child(this.props.itemKey).getDownloadURL().then((url) => {
          this.setState({
            songUrl: url
          })
          this.props.navigation.navigate('SongDetail', {
            Name: this.props.songName,
            songId: this.props.itemKey,
            iconMaker: this.props.iconMaker,
      
            songUrl: this.state.songUrl,
            songCover: this.state.coverUrl
          })
        })
      })
    })

    
  }

  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <TouchableNativeFeedback

        onPress={() => this.onClick()}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>
          <View>
            <View style={{ height: 65, flexDirection: 'row', alignItems: 'center', backgroundColor: "white" }}>
              {/* <Image
                source={require('../img/play_icon.png')}
                style={{width: 25, height: 25, borderRadius: 25, marginRight: 7, marginLeft: 7}}
              /> */}
              <Image
                source={{ uri: this.props.img }}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 7, marginLeft: 7 }}
              />
              <View style={{ marginLeft: 7 }} >
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{this.props.songName}</Text>
                <Text style={{ color: 'black' }}>{this.props.tagName}</Text>
              </View>
            </View>
          </View>

          {/* <TouchableOpacity style={{ backgroundColor: 'white', marginRight: 25, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/collection/' + this.props.itemKey).remove()
            firebase.database().ref('uploads/' + this.props.itemKey + '/collectionCount').once('value').then((snapshot) => {
              let count = snapshot.val()
              let updates = {};
              updates['uploads/' + this.props.itemKey + '/collectionCount'] = count - 1;
              firebase.database().ref().update(updates);
            })
          }}>
            <Image source={require('../img/deleteIcon.png')} />
          </TouchableOpacity> */}

        </View>
      </TouchableNativeFeedback>
    );
  }
};

export default class Uploads extends Component {
  constructor() {
    super();
    this.state = {
      list: [

      ]
    }
  }

  // static navigationOptions = {
  //   title: 'Uploads',
  //   swipeEnabled: false,
  //   tabBarIcon: iconMaker,
  //   headerStyle: { backgroundColor: '#BF4949' },
  //   headerTitleStyle: { color: 'white' },
  // };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
        title: 'Uploads',
        swipeEnabled: false,
        tabBarIcon: params.iconMaker,
        headerStyle: { backgroundColor: '#BF4949' },
        headerTitleStyle: { color: 'white' },
    }
};

  renderSeparator = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "black" }}
      />
    )
  }

  componentDidMount() {
    let ref = firebase.database().ref('users/' + this.props.navigation.state.params.id + '/uploads').on('value', (snapshot) => {
      let val = snapshot.val()
      if (!val) {
        this.setState({ list: [] })
      } else {
        let collection = Object.keys(snapshot.val())

        let list = []
        for (idx in collection) {
          let key = collection[idx]
          firebase.database().ref('uploads/' + key).once('value').then((snapshot) => {
            let songProfile = snapshot.val()

            firebase.storage().ref().child(songProfile.image).getDownloadURL().then((url) => {
              // `url` is the download URL for 'images/stars.jpg'
              let item = {
                name: songProfile.songName,
                tag: songProfile.tags['seattle'],
                img: url,
                key: key
              }

              list.push(item)
              this.setState({ list: list })

            }).catch(function (error) {
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
            <Upload itemKey={item.key} img={item.img} iconMaker={this.props.navigation.state.params.iconMaker} songName={item.name} tagName={item.tag} navigation={this.props.navigation} />
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
