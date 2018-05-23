import React, { Component } from 'react';
import { AppRegistry, View, Text, Alert, Image, Dimensions, ImageBackground, TouchableNativeFeedback, TouchableOpacity, TextInput, Button } from 'react-native';
import * as firebase from "firebase";

export default class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            fb: "",
            tw: "",
            sc: "",
            bio: ""
        }
    }

    componentWillMount() {
        this.setState({
            fb: this.props.navigation.state.params.fb,
            tw: this.props.navigation.state.params.tw,
            sc: this.props.navigation.state.params.sc,
            bio: this.props.navigation.state.params.bio
        })

    }

    save() {
        let update = {};
        update['users/' + firebase.auth().currentUser.uid + '/contactInfo/faceBook'] = this.state.fb;
        update['users/' + firebase.auth().currentUser.uid + '/contactInfo/twitter'] = this.state.tw;
        update['users/' + firebase.auth().currentUser.uid + '/contactInfo/soundCloud'] = this.state.sc;
        update['users/' + firebase.auth().currentUser.uid + '/contactInfo/bio'] = this.state.bio;
        firebase.database().ref().update(update);
        Alert.alert("Saved")
    }

    render() {
        return (
            <View style={{backgroundColor: "white"}}>
                <View>
                    <Text>Facebook</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ fb: text })}
                        value={this.state.fb}
                    />
                    <Text>Twitter</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ tw: text })}
                        value={this.state.tw}
                    />
                    <Text>SoundCloud</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ sc: text })}
                        value={this.state.sc}
                    />
                    <Text>Bio</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ bio: text })}
                        multiline={true}
                        value={this.state.bio}
                    />
                </View>
                <Button
                    onPress={this.save.bind(this)}
                    title="Save"
                    color="#841584"
                />
            </View>
        );
    }
}