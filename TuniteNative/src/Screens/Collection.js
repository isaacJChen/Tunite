import React, { Component } from 'react';
import { AppRegistry, View, Text, FlatList, Image } from 'react-native';
import Song from '../Components/Song'

export default class Collection extends Component {
  constructor() {
    super();
    this.state = {
      list: [
        {"name":"Gateway", "tag":"#john"},
        {"name":"Monster", "tag":"#jim"},
        {"name":"Slam", "tag":"#will"},
        {"name":"Gateway", "tag":"#john"},
        {"name":"Monster", "tag":"#jim"},
        {"name":"Slam", "tag":"#will"},
        {"name":"Gateway", "tag":"#john"},
        {"name":"Monster", "tag":"#jim"},
        {"name":"Slam", "tag":"#will"},
        {"name":"Gateway", "tag":"#john"},
        {"name":"Monster", "tag":"#jim"},
        {"name":"Slam", "tag":"#will"},
        {"name":"Gateway", "tag":"#john"},
        {"name":"Monster", "tag":"#jim"},
        {"name":"Slam", "tag":"#will"},
        {"name":"Gateway", "tag":"#john"},
        {"name":"Monster", "tag":"#jim"},
        {"name":"Slam", "tag":"#will"},
        {"name":"Gateway", "tag":"#john"},
        {"name":"Monster", "tag":"#jim"},
        {"name":"Slam", "tag":"#will"}
      ]
    }
  }

  static navigationOptions = {
    title: 'Collection',
    swipeEnabled: false,
    tabBarIcon: () => (<View style={{height: '100%', width: '100%'}}><Image style={{height: '100%', width: '100%'}} source={require('../img/tabBarIcon1.png')} /></View>)
  };

  renderSeparator = () => {
    return (
      <View
        style={{height: 0.5, width:"100%", backgroundColor: "black"}}
      />
    )
  }

  render() {
    return (
      <View >
        <FlatList
          data={this.state.list}
          renderItem={({item}) => (
            <Song songName={item.name} tagName={item.tag} navigation={this.props.navigation} />
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
