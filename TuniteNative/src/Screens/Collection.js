import React, { Component } from 'react';
import { AppRegistry, View, Text, FlatList, Image } from 'react-native';
import Song from '../Components/Song'

let iconMaker = function() {
  return (<View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}><Image style={{ height: '70%', width: '70%' }} source={require('../img/tabBarIcon1.png')} /><Text style={{ color: 'white', fontWeight: 'bold' }}>Collection</Text></View>)
}

export default class Collection extends Component {
  constructor() {
    super();
    this.state = {
      list: [
        { "name": "Monster", "tag": "#jim", "img": "https://images.pexels.com/photos/734483/pexels-photo-734483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"},
        { "name": "Slam", "tag": "#will", "img": "https://images.pexels.com/photos/413727/pexels-photo-413727.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Gateway", "tag": "#john", "img": "https://images.pexels.com/photos/620251/pexels-photo-620251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"},
        { "name": "Monster", "tag": "#jim", "img": "https://images.pexels.com/photos/971613/pexels-photo-971613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Slam", "tag": "#will", "img": "https://images.pexels.com/photos/991678/pexels-photo-991678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Gateway", "tag": "#john", "img": "https://images.pexels.com/photos/971613/pexels-photo-971613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Monster", "tag": "#jim", "img": "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Slam", "tag": "#will", "img": "https://images.pexels.com/photos/991678/pexels-photo-991678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Gateway", "tag": "#john", "img": "https://images.pexels.com/photos/1047349/pexels-photo-1047349.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
        { "name": "Monster", "tag": "#jim", "img": "https://images.pexels.com/photos/413727/pexels-photo-413727.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Slam", "tag": "#will", "img": "https://images.pexels.com/photos/991678/pexels-photo-991678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Gateway", "tag": "#john", "img": "https://images.pexels.com/photos/1047349/pexels-photo-1047349.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"  },
        { "name": "Gateway", "tag": "#john", "img": "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Monster", "tag": "#jim", "img": "https://images.pexels.com/photos/413727/pexels-photo-413727.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Slam", "tag": "#will", "img": "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Gateway", "tag": "#john", "img": "https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Monster", "tag": "#jim", "img": "https://images.pexels.com/photos/971613/pexels-photo-971613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Slam", "tag": "#will", "img": "https://images.pexels.com/photos/991678/pexels-photo-991678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Gateway", "tag": "#john", "img": "https://images.pexels.com/photos/1047349/pexels-photo-1047349.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"  },
        { "name": "Gateway", "tag": "#john", "img": "https://images.pexels.com/photos/991678/pexels-photo-991678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Gateway", "tag": "#john", "img": "https://images.pexels.com/photos/1047349/pexels-photo-1047349.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"  },
        { "name": "Monster", "tag": "#jim", "img": "https://images.pexels.com/photos/991678/pexels-photo-991678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
        { "name": "Gateway", "tag": "#john", "img": "https://images.pexels.com/photos/1047349/pexels-photo-1047349.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"  },
        { "name": "Slam", "tag": "#will", "img": "https://images.pexels.com/photos/413727/pexels-photo-413727.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" }
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

  render() {
    return (
      <View >
        {/* <View Style={{backgroundColor: 'black', position: 'absolute', top: 0, left: 0, width: '100%'}}>
          <Text Style={{color: 'white'}}>Recently Saved Songs</Text>
        </View> */}
        <FlatList
          data={this.state.list}
          renderItem={({ item }) => (
            <Song img={item.img} iconMaker={iconMaker} songName={item.name} tagName={item.tag} navigation={this.props.navigation} />
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
