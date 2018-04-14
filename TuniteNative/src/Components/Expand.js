import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Accordion extends Component {
    constructor(props) {
        super(props);
        this.icons = {
            'open': 'plus',
            'close': 'minus'
        };

        this.state = { expanded: false };
    }

    toggle() {
        this.setState({
            expanded: !this.state.expanded
        });
    }
    render() {
        let icon = this.icons['open'];
        if (this.state.expanded) {
            icon = this.icons['close'];
        }
        return (
            <TouchableHighlight
                style={styles.button}
                onPress={this.toggle.bind(this)}
                underlayColor="#f1f1f1">
                <View
                    style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.Header}>{this.props.Header}</Text>

                        <Icon
                            style={styles.FAIcon}
                            name={icon}
                        />

                    </View>

                    {
                        this.state.expanded && (<View style={styles.body}>
                            {this.props.children}
                        </View>)
                    }

                </View>
            </TouchableHighlight>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#0064b5',
        margin: 10,
        overflow: 'hidden'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Header: {
        flex: 1,
        padding: 10,
        color: '#fff'
    },
    FAIcon: {
        height: 30,
        color: "white",
        marginRight: 5

    },
    body: {
        padding: 10,
        paddingTop: 0,

    }
});
