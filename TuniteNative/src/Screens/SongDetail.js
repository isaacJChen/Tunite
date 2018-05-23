import React, { Component } from 'react';
import { AppRegistry, View, Button, Text, Image, ScrollView, Dimensions, TouchableNativeFeedback, FlatList, Alert, TouchableOpacity } from 'react-native';
// import Accordion from 'react-native-collapsible/Accordion';
import Tag from '../Components/Tag';
import MusicPlayer from '../Components/MusicPlayer';
//import Sound from 'react-native-sound';
import * as firebase from "firebase";

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
                <TouchableNativeFeedback onPress={() => {
                    let uid = firebase.auth().currentUser.uid
                    firebase.database().ref('users/' + uid + '/collection/' + this.props.songId).once('value').then((snapshot) => {
                        let alreadyAdded = snapshot.val()
                        if (!alreadyAdded) {
                            firebase.database().ref('uploads/' + this.props.songId + '/collectionCount').once('value').then((snapshot) => {
                                let count = snapshot.val()
                                let updates = {};
                                updates['uploads/' + this.props.songId + '/collectionCount'] = count + 1;
                                firebase.database().ref().update(updates);
                            })
                        }
                    })

                    let updates = {};
                    updates['/users/' + uid + '/collection/' + this.props.songId] = this.props.songId;
                    firebase.database().ref().update(updates)
                    Alert.alert("Added to collection!")
                }}>
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
                { "image": "Gateway", "tag": "john", "follow": true, "image": 'https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' },
                { "image": "Monster", "tag": "jim", "follow": false, 'image': 'https://images.pexels.com/photos/374703/pexels-photo-374703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' },
                { "image": "Slam", "tag": "will", "follow": true, 'image': 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' }
            ],
            credits: [
                { "role": "Owner", "tag": "john", "follow": true, 'image': 'https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' },
                { "role": "Feature", "tag": "jim", "follow": false, 'image': 'https://images.pexels.com/photos/111287/pexels-photo-111287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' },
                { "role": "Feature", "tag": "will", "follow": true, 'image': 'https://images.pexels.com/photos/813940/pexels-photo-813940.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' }
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

    callback() {

    }

    goToPromoted() {
        firebase.database().ref('uploads/' + this.props.navigation.state.params.songId + '/root').once('value').then((snapshot) => {
            let val = snapshot.val()
            if (this.props.navigation.state.params.songId == val) {
                Alert.alert("This is root")
            } else {
                let songName = ""
                let songUrl = ""
                let coverUrl = ""
                firebase.database().ref('uploads/' + val + "/songName").once('value').then((snapshot) => {
                    songName = snapshot.val()
                    firebase.storage().ref().child(val).getDownloadURL().then((url) => {
                        // `url` is the download URL for 'images/stars.jpg'
                        songUrl = url
                        firebase.database().ref('uploads/' + val + '/image').once('value').then((snapshot) => {
                            let img = snapshot.val()
                            firebase.storage().ref().child(img).getDownloadURL().then((url) => {
                                // `url` is the download URL for 'images/stars.jpg'
                                coverUrl = url
                                this.props.navigation.navigate("SongDetail", {
                                    Name: songName,
                                    iconMaker: this.props.navigation.state.params.iconMaker,
                                    songUrl: songUrl,
                                    songCover: coverUrl,
                                    songId: val
                                })
                            }).catch(function (error) {
                                // Handle any errors
                                Alert.alert(error.toString())
                            });
                        })
                    }).catch(function (error) {
                        // Handle any errors
                        Alert.alert(error.toString())
                    });
                })
            }
        })
    }

    render() {
        const deviceWidth = Dimensions.get('window').width;
        let track = {
            id: '1',
            url: { uri: this.props.navigation.state.params.songUrl }, // Load media from the app bundle

            artwork: require('../img/cover_art.png')
        };
        return (
            // Try setting `alignItems` to 'flex-start'
            // Try setting `justifyContent` to `flex-end`.
            // Try setting `flexDirection` to `row`.

            <ScrollView >
                <View style={{ height: deviceWidth * 0.75 }}>
                    <MusicPlayer callback={this.callback} id="0" image={this.props.navigation.state.params.songCover} track={track} fullSong={true} />
                </View>

                {/* <Image
                    source={require('../img/cover_art.png')}
                    style={{ width: deviceWidth, height: deviceWidth * .75 }}
                /> */}
                <Options songId={this.props.navigation.state.params.songId} name="Save to Collection" destination='Explore' navigation={this.props.navigation} />
                <Label label="Tags:" />
                <FlatList
                    data={this.state.tags}
                    renderItem={({ item }) => (
                        <Tag tag={item.tag} navigation={this.props.navigation} image={item.image} />
                    )}
                    keyExtractor={item => item.tag}
                    horizontal
                />
                <TouchableOpacity onPress={() => this.goToPromoted()}>
                    <Label label="Owner Promoted Version" />
                </TouchableOpacity>
                <Label label="Credits:" follow="follow" />
                <FlatList
                    data={this.state.credits}
                    renderItem={({ item, index }) => (
                        // <Tag tag={item.tag} role={item.role} navigation={this.props.navigation} />
                        <Tag tag={item.tag} role={item.role} index={index} navigation={this.props.navigation} image={item.image} />
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
