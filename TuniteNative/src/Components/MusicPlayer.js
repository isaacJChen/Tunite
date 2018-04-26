import React, { Component } from 'react';
import { AppRegistry, View, Button, Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';

// AppRegistry.registerHeadlessTask('SomeTaskName',);

var track = {
    id: '1',
    url: require('../mp3/m.mp3'), // Load media from the app bundle

    artwork: require('../img/cover_art.png')
};

TrackPlayer.setupPlayer().then(async () => {

    // Adds a track to the queue
    await TrackPlayer.add({
        id: 'trackId',
        url: require('../mp3/m.mp3'),
        title: 'Track Title',
        artist: 'Track Artist',
        artwork: require('../img/cover_art.png')
    });

    // Starts playing it
    TrackPlayer.play();

});

export default class MusicPlayer extends Component {

    // async componentDidMount() {
    //     await TrackPlayer.setupPlayer({});
    //     TrackPlayer.add([track]);

    // }
    // async componentDidMount() {
    //     await TrackPlayer.setupPlayer({});
    //     await TrackPlayer.add(Track);
    //     // TrackPlayer.play();
    // }

    render() {
        return (
            // Try setting `alignItems` to 'flex-start'
            // Try setting `justifyContent` to `flex-end`.
            // Try setting `flexDirection` to `row`.
            <View>
                <Button onPress={() => this.play()}
                    title="Play">
                </Button>
                <Button onPress={() => this.stop()}
                    title="Stop">
                </Button>
            </View>
        );
    }

    play() {
        TrackPlayer.play()
    }

    stop() {
        TrackPlayer.stop()
    }

};


TrackPlayer.registerEventHandler('SomeTaskName', TrackPlayer.setupPlayer);

AppRegistry.registerComponent('Tunite', () => MusicPlayer);

