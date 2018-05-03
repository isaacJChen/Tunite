import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, Image, ScrollView, Dimensions, TouchableNativeFeedback, FlatList } from 'react-native';
// import Accordion from 'react-native-collapsible/Accordion';
import Tag from '../Components/Tag';
import MusicPlayer from '../Components/MusicPlayer';

const SECTIONS = [
    {
        title: 'First',
        content: 'Lorem ipsum...'
    },
    {
        title: 'Second',
        content: 'Lorem ipsum...'
    }
];


// AppRegistry.registerComponent('Tunite', () => SongDetail);

AppRegistry.registerHeadlessTask('TrackPlayer', () => require('../Components/MusicPlayer'));

class Options extends Component {
    render() {
        return (
            <View>
            <TouchableNativeFeedback >
                <View style={{ alignItems: 'center', height: 50, flexDirection: 'row' }}>
                    <Image
                        source={require('../img/save-btn.png')}
                        style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 7, marginRight: 15 }}
                    />
                    <Text>Save To Collection</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate(this.props.destination, {
                Name: this.props.songName,
                iconMaker: this.props.navigation.state.params.iconMaker,
            })}>
                <View style={{ alignItems: 'center', height: 50, flexDirection: 'row' }}>
                    <Image
                        source={require('../img/musicNoteBtn.png')}
                        style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 7, marginRight: 15 }}
                    />
                    <Text>Explore All Versions</Text>
                </View>
            </TouchableNativeFeedback>
            </View>
        );
    }
}

class Label extends Component {
    render() {
        return (
            <View style={{ height: 30, backgroundColor: "#C96565", justifyContent: 'center', paddingLeft: 5, marginBottom: 2, marginTop: 2 }}>
                <Text style={{ fontWeight: "bold", color: 'white' }}>{this.props.label}</Text>
            </View>
        );
    }
}

export default class SongDetail extends Component {
    constructor() {
        super();
        this.state = {
            tags: [
                { "image": "Gateway", "tag": "#john", "follow": true },
                { "image": "Monster", "tag": "#jim", "follow": false },
                { "image": "Slam", "tag": "#will", "follow": true }
            ],
            credits: [
                { "role": "Owner", "tag": "#john", "follow": true },
                { "role": "Feature", "tag": "#jim", "follow": false },
                { "role": "Feature", "tag": "#will", "follow": true }
            ]
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.Name : 'Song Details',
            swipeEnabled: false,
            tabBarIcon: params.iconMaker
        }
    };

    //static navigationOptions =

    _renderHeader(section) {
        return (
            <View style={{ height: 30, backgroundColor: "red" }}>
                <Text>{section.title}</Text>
            </View>
        );
    }

    _renderContent(section) {
        return (
            <View>
                <Text>{section.content}</Text>
            </View>
        );
    }

    render() {
        const deviceWidth = Dimensions.get('window').width;


        return (
            // Try setting `alignItems` to 'flex-start'
            // Try setting `justifyContent` to `flex-end`.
            // Try setting `flexDirection` to `row`.

            <ScrollView >
              <View style={{height: deviceWidth * 0.75}}>
                <MusicPlayer image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSipPOQ9zpWb7CP25pfxPCZVERljvQNkeYRxjDOMlpfb5ZXiPtCZw'/>
              </View>

                {/* <Image
                    source={require('../img/cover_art.png')}
                    style={{ width: deviceWidth, height: deviceWidth * .75 }}
                /> */}
                <Options name="Save to Collection" destination='Explore' navigation={this.props.navigation} />
                <Label label="Tags:" />
                <FlatList
                    data={this.state.tags}
                    renderItem={({ item }) => (
                        <Tag tag={item.tag} navigation={this.props.navigation} />
                    )}
                    keyExtractor={item => item.tag}
                    horizontal
                />
                <Label label="Owner Promoted Version" />
                <Label label="Credits:" follow="follow" />
                <FlatList
                    data={this.state.credits}
                    renderItem={({ item, index }) => (
                        // <Tag tag={item.tag} role={item.role} navigation={this.props.navigation} />
                        <Tag tag={item.tag} role={item.role} index={index} navigation={this.props.navigation} />
                    )}
                    keyExtractor={(item, index) => item.tag}
                    horizontal
                />
                {/* <Accordion
                    sections={SECTIONS}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                /> */}
            </ScrollView>
        );
    }
};



// skip this line if using Create React Native App
AppRegistry.registerComponent('Tunite', () => SongDetail);
