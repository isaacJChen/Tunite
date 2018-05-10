import React, { Component } from 'react';
import { AppRegistry, View, Button, Alert, TouchableOpacity, Image, StyleSheet, Text, TouchableWithoutFeedback, Slider, Dimensions } from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import Sound from 'react-native-sound';
import { formatTime } from '../Logic/util';

// TrackPlayer.registerEventHandler(require('../Logic/player-event'));

// class ProgressBar extends ProgressComponent {

//     state = {
//         duration: 0,
//         isSeeking: false
//     }
//     formatTime(seconds) {
//         return seconds > 3600
//             ?
//             [
//                 parseInt(seconds / 60 / 60),
//                 parseInt(seconds / 60 % 60),
//                 parseInt(seconds % 60)
//             ].join(":").replace(/\b(\d)\b/g, "0$1")
//             :
//             [
//                 parseInt(seconds / 60 % 60),
//                 parseInt(seconds % 60)
//             ].join(":").replace(/\b(\d)\b/g, "0$1")
//     }
//     render() {
//         TrackPlayer.getDuration().then(duration => this.setState({ duration }))
//         return (
//             <View>
//                 <View style={{ flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center' }}>
//                     <Text style={{ color: 'white', backgroundColor: 'transparent', width: 40, textAlign: 'center', fontSize: 12 }}>
//                         {this.state.isSeeking ? this.formatTime(this.seek) : this.formatTime(this.state.position)}
//                     </Text>
//                     <Slider
//                         minimumValue={0}
//                         maximumValue={this.state.duration}
//                         thumbTintColor="white"
//                         minimumTrackTintColor="#f06595"
//                         maximumTrackTintColor="rgba(255,255,255,.8)"
//                         step={1}
//                         onValueChange={val => {
//                             // TrackPlayer.pause();
//                             this.seek = val;
//                             this.setState({ isSeeking: true })
//                         }}
//                         onSlidingComplete={val => {
//                             this.setState({ isSeeking: false }, () => {
//                                 TrackPlayer.seekTo(this.seek);
//                                 this.position = this.seek;
//                                 // TrackPlayer.play();
//                             })
//                         }}
//                         value={this.state.isSeeking ? this.seek : this.state.position}
//                         width={Dimensions.get('window').width - 95}
//                     />
//                     <Text>{this.formatTime(this.state.duration)}</Text>
//                 </View>
//             </View>
//         )
//     }

// }

class ProgressBar extends ProgressComponent {

    render() {
        const position = formatTime(Math.floor(this.state.position));
        const duration = formatTime(Math.floor(this.state.duration));
        const info = position + ' / ' + duration;

        let progress = this.getProgress() * 100;
        let buffered = this.getBufferedProgress() * 100;
        buffered -= progress;
        if(buffered < 0) buffered = 0;

        return (
            <View style={styles.view}>
                <Text style={styles.info}>{info}</Text>
                <TouchableWithoutFeedback>
                    <View style={styles.bar}>
                        <View style={[{width: progress + '%'}, styles.played]} />
                        <View style={[{width: buffered + '%'}, styles.buffered]} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

}

// var track = {
//     id: '1',
//     url: require('../mp3/m.mp3'), // Load media from the app bundle

//     artwork: require('../img/cover_art.png')
// };

// TrackPlayer.setupPlayer().then(async () => {

//     // Adds a track to the queue
//     await TrackPlayer.add({
//         id: 'trackId',
//         url: require('../mp3/s.mp3'),
//         title: 'Track Title',
//         artist: 'Track Artist',
//         artwork: require('../img/cover_art.png')
//     });

//     // Starts playing it
//     // TrackPlayer.play();

// });

export default class MusicPlayer extends Component {

    constructor() {
        super();
        this.state = {
            playing: false
        }

        // this.handler = this.handler.bind(this)
    }

    componentDidMount() {
        TrackPlayer.setupPlayer({});
        // TrackPlayer.add(this.props.track);

    }

    componentWillUnmount() {
        TrackPlayer.reset();
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

    async _playPause() {
        // this.props.callback();
        
        let state = await TrackPlayer.getState();

        
        // Alert.alert(TrackPlayer.getState());
        // if (state == 'STATE_NONE') {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("NONE");
        // } else if (state == 'STATE_PLAYING') {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("PLAYING");
        // } else if (state == 'STATE_PAUSED') {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("PAUSED");
        // } else if (state == 'STATE_STOPPED') {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("STOPPED");
        // } else if (state == 'STATE_BUFFERING') {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("BUFFERING");
        // } else {
        //     Alert.alert("SHIT");
        // }

        // if (state == 0) {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("NONE");
        // } else if (state == 3) {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("PLAYING");
        // } else if (state == 2) {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("PAUSED");
        // } else if (state == 1) {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("STOPPED");
        // } else if (state == 6) {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("BUFFERING");
        // } else {
        //     Alert.alert("SHIT");
        // }

        // if (this.props.state == TrackPlayer.STATE_NONE) {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("NONE");
        // } else if (this.props.state == TrackPlayer.STATE_PLAYING) {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("PLAYING");
        // } else if (this.props.state == TrackPlayer.STATE_PAUSED) {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("PAUSED");
        // } else if (this.props.state == TrackPlayer.STATE_STOPPED) {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("STOPPED");
        // } else if (this.props.state == TrackPlayer.STATE_BUFFERING) {
        //     // TrackPlayer.add(this.props.track).play();
        //     Alert.alert("BUFFERING");
        // } else {
        //     Alert.alert("SHIT");
        // }


        if (state == 0) {
            TrackPlayer.add(this.props.track);
            Alert.alert("songadd");
        }
        // if (this.state.playing) {
        //     TrackPlayer.pause();
        // } else {
        //     TrackPlayer.play();
        // }
        let trackId = await TrackPlayer.getCurrentTrack();

        // if(2 == trackId) {
        //     Alert.alert("true");
        // } else {
        //     Alert.alert("false");
        // }

        if (this.state.playing) {
            if (trackId != this.props.track['id']) {
                TrackPlayer.reset();
                TrackPlayer.add(this.props.track).play();
                this.setState({ playing: true })
            } else {
                TrackPlayer.pause();
                this.setState({ playing: false })
            }

        } else {
            TrackPlayer.play();
            this.setState({ playing: true })
        }

        
    }


    // async _isPlaying() {
    //     let state = await TrackPlayer.getState();
    //     return state;
    // }

    render() {
        const deviceWidth = Dimensions.get('window').width;
        return (
            // Try setting `alignItems` to 'flex-start'
            // Try setting `justifyContent` to `flex-end`.
            // Try setting `flexDirection` to `row`.
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Image
                    source={{ uri: this.props.image }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}
                />
                <TouchableOpacity onPress={() => this._playPause()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={this.state.playing ? require('../img/pause.png') : require('../img/roundPlayButton.png')} style={{ marginTop: 5, marginBottom: 5 }} />
                </TouchableOpacity>
                <View style={{position: 'absolute', bottom: 5 }}>
                    <ProgressBar />
                </View>
                {/* <ProgressBar /> */}
                {/* <Button title="ttt" onPress={() => TrackPlayer.reset()} /> */}
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

function mapStateToProps(state) {
    // const currentTrack = state.playback.currentTrack;
    const tracks = state.library.tracks;

    return {
        state: state.playback.state,
        // track: tracks ? tracks.find((track) => track.id == currentTrack) : null
    };
}

// module.exports = connect(mapStateToProps)(MusicPlayer);

// TrackPlayer.registerEventHandler('SomeTaskName', TrackPlayer.setup.Player);

// AppRegistry.registerComponent('Tunite', () => MusicPlayer);
// TrackPlayer.registerEventHandler(require('../Logic/player-event.js'));
// TrackPlayer.registerHeadlessTask('TrackPlayer', () => require('../Logic/player-event.js'));
AppRegistry.registerComponent('Tunite', () => MusicPlayer);
// TrackPlayer.registerEventHandler(() => require('../Logic/player-event'));
// AppRegistry.registerHeadlessTask('TrackPlayer', () => require('../Logic/player-event'));
