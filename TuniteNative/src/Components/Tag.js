import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, StyleSheet, Button, Alert, TouchableHighlight } from 'react-native';
import * as firebase from "firebase";

export default class Tag extends Component {
    constructor() {
        super()
        this.state = {
            user: firebase.auth().currentUser,
            databaseRef: firebase.database().ref(),
            following: false,
            text: "follow"
        }
    }

    componentDidMount() {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/following/' + this.props.tag).once('value').then((snapshot)=>{
            let val = snapshot.val()
            if (val) {
                this.setState({
                    following: true,
                    text: "following"
                })
            }
        }) 
        
    }

    onClick() {
        Alert.alert('You tapped the button!');
        if (this.state.following) {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/following/'+ this.props.tag).remove();
            this.setState({
                text: "follow",
            })
        } else {
            let update ={};
            update['users/' + firebase.auth().currentUser.uid + '/following/' + this.props.tag] = this.props.tag;
            firebase.database().ref().update(update);
            this.setState({
                text: "following",
            })
        }
        this.setState({
            following: !this.state.following
        })
    }

    render() {
        return (
            // Try setting `alignItems` to 'flex-start'
            // Try setting `justifyContent` to `flex-end`.
            // Try setting `flexDirection` to `row`.
            <View style={styles.tag}>
                <Text style={styles.credit}>{this.props.role}</Text>
                <Image
                    source={{ uri: this.props.image }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <Text style={styles.text}>#{this.props.tag}</Text>
                <TouchableHighlight
                    onPress={() => {
                        this.onClick()
                    }}
                >
                    <View
                        style={this.state.following ? styles.followingButton : styles.followButton}
                    >
                        <Text style={this.state.following ? styles.followingText : styles.followText}>{this.state.text}</Text>
                    </View>
                </TouchableHighlight>
                {/* <Button
                    onPress={() => {
                        Alert.alert('You tapped the button!');
                    }}
                    title="follow"
                    color="#EB5757"

                /> */}
            </View>
        );
    }
};

var styles = StyleSheet.create({
    text: {
        margin: 5,
    },

    credit: {
        margin: 5,
        fontWeight: 'bold'
    },

    followingButton: {
        height: 20,
        width: 68,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        // borderWidth: 1,
        // borderColor: "#EB5757"
    },

    followButton: {
        height: 20,
        width: 60,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#EB5757',
    },

    followingText: {
        color: "#EB5757"
    },

    followText: {
        color: "white"
    },

    tag: {
        flexDirection: "column", margin: 5, padding: 5, width: 100, alignItems: 'center',
    }
})
