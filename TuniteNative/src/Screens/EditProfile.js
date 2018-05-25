import React, { Component } from 'react';
import { AppRegistry, View, Text, Alert, Image, Dimensions, ImageBackground, TouchableNativeFeedback, TouchableOpacity, TextInput, Button } from 'react-native';
import * as firebase from "firebase";
// import PhotoUpload from 'react-native-photo-upload'
import ImagePicker from 'react-native-image-picker'

export default class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            fb: "",
            tw: "",
            sc: "",
            bio: "",
            avatarSource:""
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

  


    upload() {
        
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        })
        // ImagePicker.launchCamera(options, (response)  => {
        //     // Same code as in above section!
        //   });
          
    }

    render() {
        return (
            <View style={{ backgroundColor: "white" }} >
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
                <Button
                    onPress={this.upload.bind(this)}
                    title="Upload"
                    color="#841584"
                />
                <Image source={this.state.avatarSource} />
                {/* <PhotoUpload>
                    <Image
                        source={{
                            uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                        }}
                    />
                </PhotoUpload> */}
            </View >

        );
    }
}