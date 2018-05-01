import React, { Component } from 'react';
import { AppRegistry, View, Button, Alert, TouchableOpacity, Image, StyleSheet, Text, TouchableWithoutFeedback, Slider, Dimensions } from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
// import { formatTime } from '../Logic/util';

// TrackPlayer.registerEventHandler(require('../Logic/player-event'));

class ProgressBar extends ProgressComponent {

    state = {
        duration: 0,
        isSeeking: false
    }
    formatTime(seconds) {
        return seconds > 3600
            ?
            [
                parseInt(seconds / 60 / 60),
                parseInt(seconds / 60 % 60),
                parseInt(seconds % 60)
            ].join(":").replace(/\b(\d)\b/g, "0$1")
            :
            [
                parseInt(seconds / 60 % 60),
                parseInt(seconds % 60)
            ].join(":").replace(/\b(\d)\b/g, "0$1")
    }
    render() {
        TrackPlayer.getDuration().then(duration => this.setState({ duration }))
        return (
            <View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center' }}>
                    <Text style={{ color: 'white', backgroundColor: 'transparent', width: 40, textAlign: 'center', fontSize: 12 }}>
                        {this.state.isSeeking ? this.formatTime(this.seek) : this.formatTime(this.state.position)}
                    </Text>
                    <Slider
                        minimumValue={0}
                        maximumValue={this.state.duration}
                        thumbTintColor="white"
                        minimumTrackTintColor="#f06595"
                        maximumTrackTintColor="rgba(255,255,255,.8)"
                        step={1}
                        onValueChange={val => {
                            // TrackPlayer.pause();
                            this.seek = val;
                            this.setState({ isSeeking: true })
                        }}
                        onSlidingComplete={val => {
                            this.setState({ isSeeking: false }, () => {
                                TrackPlayer.seekTo(this.seek);
                                this.position = this.seek;
                                // TrackPlayer.play();
                            })
                        }}
                        value={this.state.isSeeking ? this.seek : this.state.position}
                        width={Dimensions.get('window').width - 95}
                    />
                    <Text>{this.formatTime(this.state.duration)}</Text>
                </View>
            </View>
        )
    }

}

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
    // TrackPlayer.play();

});

export default class MusicPlayer extends Component {

    // async componentDidMount() {
    //     await TrackPlayer.setupPlayer({});
    //     TrackPlayer.add([track]);

    // }
    constructor() {
        super();
        this.state = {
            playing: false
        }
    }

    // async componentDidMount() {
    //     await TrackPlayer.setupPlayer({});
    //     await TrackPlayer.add(Track);
    //     // TrackPlayer.play();
    //     // TrackPlayer.updateOptions({
    //     //     capabilities: [
    //     //         TrackPlayer.CAPABILITY_PLAY,
    //     //         TrackPlayer.CAPABILITY_PAUSE,
    //     //         TrackPlayer.CAPABILITY_SEEK_TO,
    //     //         TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    //     //         TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
    //     //     ]
    //     // });
    // }

    _playPause() {
        if (this.state.playing) {
            TrackPlayer.pause();
        } else {
            TrackPlayer.play();
        }
        this.setState({ playing: !this.state.playing })
    }

    render() {
        const deviceWidth = Dimensions.get('window').width;
        return (
            // Try setting `alignItems` to 'flex-start'
            // Try setting `justifyContent` to `flex-end`.
            // Try setting `flexDirection` to `row`.
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Image
                    source={require('../img/cover_art.png')}
                    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',}}
                />
                <TouchableOpacity onPress={() => this._playPause()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={this.state.playing ? require('../img/pause.png') : require('../img/roundPlayButton.png')} style={{ marginTop: 5, marginBottom: 5 }} />
                </TouchableOpacity>
                {/* <View style={{position: 'absolute', bottom: 5 }}>
                    <ProgressBar />
                </View> */}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        width: '100%'
    },
    info: {
        color: '#c0c0c0',
        fontSize: 16,
        fontWeight: '300',
        margin: 10
    },
    bar: {
        backgroundColor: '#575757',
        height: 5,
        width: '100%',
        margin: 10,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    played: {
        backgroundColor: '#03A9F4',
        height: 5
    },
    buffered: {
        backgroundColor: '#797979',
        height: 5
    }
});


// TrackPlayer.registerEventHandler('SomeTaskName', TrackPlayer.setup.Player);

// AppRegistry.registerComponent('Tunite', () => MusicPlayer);
// TrackPlayer.registerEventHandler(require('../Logic/player-event.js'));
// TrackPlayer.registerHeadlessTask('TrackPlayer', () => require('../Logic/player-event.js'));
AppRegistry.registerComponent('Tunite', () => MusicPlayer);
// TrackPlayer.registerEventHandler(() => require('../Logic/player-event'));
// AppRegistry.registerHeadlessTask('TrackPlayer', () => require('../Logic/player-event'));
