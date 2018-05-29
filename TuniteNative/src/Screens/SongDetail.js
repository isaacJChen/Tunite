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
    constructor(props) {
        super(props)
        this.state = {
            display: { alignItems: 'center', height: 50, flexDirection: 'row', display: "none" }
        }
    }
    _toExplore() {
        firebase.database().ref("uploads").once('value').then((snapshot) => {
            let uploads = snapshot.val()
            firebase.database().ref("uploads/" + this.props.songId + "/root").once("value").then((innersnapshot) => {
                let rootId = innersnapshot.val()
                this.props.navigation.navigate('Explore', {
                    Name: "name",
                    iconMaker: this.props.iconMaker,
                    rootId: rootId,
                    uploads: uploads
                })
            })
        })
    }

    componentDidMount() {
        firebase.database().ref("uploads/" + this.props.songId + "/owner").once("value").then((snapshot) => {
            let owner = snapshot.val()
            let display = { alignItems: 'center', height: 50, flexDirection: 'row' }
            if (firebase.auth().currentUser.uid == owner) {
                this.setState({ display: display })
            } else {
                display.display = "none"
                this.setState({ display: display })
            }
        })
    }

    setPromoted() {
        firebase.database().ref('uploads/' + this.props.songId + "/root").once('value').then((snapshot) => {
            let root = snapshot.val()

            firebase.database().ref("uploads/" + root + "/promotedVersion").once('value').then((snapshot) => {
                let promotedVersion = snapshot.val()

                let promotedData = {}
                promotedData['uploads/' + promotedVersion + "/promoted"] = false
                firebase.database().ref().update(promotedData)


                let rootData = {}
                rootData['uploads/' + root + "/promotedVersion"] = this.props.songId
                firebase.database().ref().update(rootData);

                let currentData = {}
                currentData['uploads/' + this.props.songId + "/promoted"] = true
                firebase.database().ref().update(currentData)
                Alert.alert("updated!")
            })
        })
    }

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

                <TouchableNativeFeedback onPress={() => this._toExplore()}>
                    <View style={{ alignItems: 'center', height: 50, flexDirection: 'row' }}>
                        <Image
                            source={require('../img/musicNoteBtn.png')}
                            style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 7, marginRight: 15 }}
                        />
                        <Text>Explore All Versions</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => this.setPromoted()}>
                    <View style={this.state.display}>
                        <Image
                            source={require('../img/star.png')}
                            style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 7, marginRight: 15 }}
                        />
                        <Text>Set Promoted</Text>
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
            tags: [],
            credits: []
        }
    }

    componentWillMount() {
        let tags = [];
        let credits = [];
        firebase.database().ref('uploads/' + this.props.navigation.state.params.songId + '/tags').once('value').then((snapshot) => {
            let val = snapshot.val()
            let keys = Object.keys(val)
            for (let i = 0; i < keys.length; i++) {
                firebase.database().ref('tags/' + keys[i] + '/image').once('value').then((snapshot) => {
                    let image = snapshot.val();
                    tags.push({ "tag": keys[i], "image": image ? image : "http://identicon-1132.appspot.com/" + keys[i].replace(/\s/g, '')})
                    this.setState({
                        tags: tags
                    })
                })
            }

            firebase.database().ref('uploads/' + this.props.navigation.state.params.songId + '/collaborators').once('value').then((snapshot) => {
                let val = snapshot.val()
                let collKeys = Object.keys(val)
                for (let i = 0; i < collKeys.length; i++) {
                    firebase.database().ref('uploads/' + this.props.navigation.state.params.songId + '/collaborators/' + collKeys[i]).once('value').then((snapshot) => {
                        let user = snapshot.val();
                            firebase.database().ref('users/' + user + '/userName').once('value').then((snapshot) => {
                                let name = snapshot.val()
                                firebase.storage().ref().child(user).getDownloadURL().then((url) => {
                                    let imageUrl = url
                                    credits.push({ "role": collKeys[i] == "owner" ? "Owner" : "Feature", "tag": name, "image": imageUrl, "id": user })
                                    // if (credits[i]["role"] == owner) {
                                    //     let a = arr.splice(i, 1);   // removes the item
                                    //     credits.unshift(a[0]);
                                    // }
                                    this.setState({
                                        credits: credits
                                    })
                                }).catch((err)=>{
                                    credits.push({ "role": collKeys[i] == "owner" ? "Owner" : "Feature", "tag": name, "image": "http://identicon-1132.appspot.com/" + name.replace(/\s/g, ''), "id": user })
                                    // if (credits[i]["role"] == owner) {
                                    //     let a = arr.splice(i, 1);   // removes the item
                                    //     credits.unshift(a[0]);
                                    // }
                                    this.setState({
                                        credits: credits
                                    })
                                })


                        })
                    })
                }
                // let updateCredits = credits
                // // Alert.alert(updateCredits[0]["role"])
                // for (let i = 0; i < updateCredits.length; i++) {
                //     if (updateCredits[i]["role"] == owner) {
                //         let a = arr.splice(i, 1);   // removes the item
                //         updateCredits.unshift(a[0]);         // adds it back to the beginning
                //         break;
                //     }
                // }

                this.setState({
                    credits: updateCredits
                })
            })


        })
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
            let r = snapshot.val()

            firebase.database().ref('uploads/' + r + "/promotedVersion").once('value').then((snapshot) => {
                let val = snapshot.val()

                if (val == this.props.navigation.state.params.songId) {
                    Alert.alert("This is the promoted Version")
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
        })
    }

    goToOriginal() {
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
                <Options songId={this.props.navigation.state.params.songId} name="Explore" destination='Explore' iconMaker={this.props.navigation.state.params.iconMaker} navigation={this.props.navigation} />
                <Label label="Tags:" />
                <FlatList
                    data={this.state.tags}
                    renderItem={({ item }) => (
                        <Tag tag={item.tag} navigation={this.props.navigation} image={item.image} />
                    )}
                    keyExtractor={item => item.tag}
                    horizontal
                />
                <TouchableOpacity onPress={() => this.goToOriginal()}>
                    <Label label="Original Version" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.goToPromoted()}>
                    <Label label="Promoted Version" />
                </TouchableOpacity>
                <Label label="Credits:" follow="follow" />
                <FlatList
                    data={this.state.credits}
                    renderItem={({ item, index }) => (
                        // <Tag tag={item.tag} role={item.role} navigation={this.props.navigation} />
                        <Tag tag={item.tag} role={item.role} index={index} navigation={this.props.navigation} image={item.image} id={item.id} iconMaker={this.props.navigation.state.params.iconMaker}/>
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
