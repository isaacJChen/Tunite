import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, Image, ScrollView, Dimensions, TouchableNativeFeedback, FlatList, Alert } from 'react-native';
// import Accordion from 'react-native-collapsible/Accordion';
import Tag from '../Components/Tag';
import MusicPlayer from '../Components/MusicPlayer';
import Sound from 'react-native-sound';

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
// Sound.setCategory('Playback');
// var song = new Sound('../s.mp3', Sound.MAIN_BUNDLE)
// song.play((success) => {
//     if (success) {
//         console.log('successfully finished playing');
//     } else {
//         console.log('playback failed due to audio decoding errors');
//         // reset the player to its uninitialized state (android only)
//         // this is the only option to recover after an error occured and use the player again
//         song.reset();
//     }
// });

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
                { "image": "Gateway", "tag": "#john", "follow": true , "image": 'https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350'},
                { "image": "Monster", "tag": "#jim", "follow": false, 'image': 'https://images.pexels.com/photos/374703/pexels-photo-374703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' },
                { "image": "Slam", "tag": "#will", "follow": true, 'image': 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' }
            ],
            credits: [
                { "role": "Owner", "tag": "#john", "follow": true, 'image': 'https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' },
                { "role": "Feature", "tag": "#jim", "follow": false, 'image': 'https://images.pexels.com/photos/111287/pexels-photo-111287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' },
                { "role": "Feature", "tag": "#will", "follow": true, 'image': 'https://images.pexels.com/photos/813940/pexels-photo-813940.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' }
            ]
        }
    }

    componentWillMount() {
        // Sound.setCategory('Playback');
        // var song = new Sound(require('../mp3/m.mp3'), Sound.MAIN_BUNDLE, (error) => {
        //     if (error) {
        //       console.log('failed to load the sound', error);
        //       Alert.alert(error);
        //       return;
        //     }
        //     // loaded successfully
        //     Alert.alert('create');
        //     console.log('duration in seconds: ' + song.getDuration() + 'number of channels: ' + song.getNumberOfChannels());
        //   });
        // song.play((success) => {
        //     if (success) {
        //         console.log('successfully finished playing');
        //         Alert.alert('playing');
        //     } else {
        //         console.log('playback failed due to audio decoding errors');
        //         Alert.alert('error1');
        //         // reset the player to its uninitialized state (android only)
        //         // this is the only option to recover after an error occured and use the player again
        //         song.reset();
        //     }
        // });
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.Name : 'Song Details',
            swipeEnabled: false,
            tabBarIcon: params.iconMaker,
            headerStyle: { backgroundColor: '#BF4949' },
            headerTitleStyle: { color: 'white' },
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
        let track = {
            id: '1',
            url: require('../mp3/m.mp3'), // Load media from the app bundle

            artwork: require('../img/cover_art.png')
        };

        return (
            // Try setting `alignItems` to 'flex-start'
            // Try setting `justifyContent` to `flex-end`.
            // Try setting `flexDirection` to `row`.

            <ScrollView >
                <View style={{ height: deviceWidth * 0.75 }}>
                    <MusicPlayer image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSipPOQ9zpWb7CP25pfxPCZVERljvQNkeYRxjDOMlpfb5ZXiPtCZw' track={track} />
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
                        <Tag tag={item.tag} navigation={this.props.navigation} image={item.image}/>
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
                        <Tag tag={item.tag} role={item.role} index={index} navigation={this.props.navigation} image={item.image}/>
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
