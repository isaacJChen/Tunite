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
        { "name": "Gateway", "tag": "#john" },
        { "name": "Monster", "tag": "#jim" },
        { "name": "Slam", "tag": "#will" },
        { "name": "Gateway", "tag": "#john" },
        { "name": "Monster", "tag": "#jim" },
        { "name": "Slam", "tag": "#will" },
        { "name": "Gateway", "tag": "#john" },
        { "name": "Monster", "tag": "#jim" },
        { "name": "Slam", "tag": "#will" },
        { "name": "Gateway", "tag": "#john" },
        { "name": "Monster", "tag": "#jim" },
        { "name": "Slam", "tag": "#will" },
        { "name": "Gateway", "tag": "#john" },
        { "name": "Monster", "tag": "#jim" },
        { "name": "Slam", "tag": "#will" },
        { "name": "Gateway", "tag": "#john" },
        { "name": "Monster", "tag": "#jim" },
        { "name": "Slam", "tag": "#will" },
        { "name": "Gateway", "tag": "#john" },
        { "name": "Monster", "tag": "#jim" },
        { "name": "Slam", "tag": "#will" }
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
            <Song iconMaker={iconMaker} songName={item.name} tagName={item.tag} navigation={this.props.navigation} />
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
