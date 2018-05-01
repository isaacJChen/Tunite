import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {TabNavigator, StackNavigator, SwitchNavigator, Dimensions} from 'react-navigation';
import Title from './src/Components/Title';
import Explore from './src/Screens/Explore';
import Collection from './src/Screens/Collection';
import Profile from './src/Screens/Profile';
import Feed from './src/Screens/Feed';
import SongDetail from './src/Screens/SongDetail';
import * as firebase from "firebase";
import Login from './src/Screens/Login'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});


// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <MainView />
//         <NavBar />
//       </View>
//     );
//   }
// }
export const CollectionStack = StackNavigator({
  Collection: {
    screen: Collection
  },
  SongDetail: {
    screen: SongDetail
  },
  Explore: {
    screen: Explore
  }
});

export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed
  },
  SongDetail: {
    screen: SongDetail
  },
  Explore: {
    screen: Explore
  }
});

export const SignedIn = TabNavigator({
  Feed: {
    screen: FeedStack
  },
  Collection: {
    screen: CollectionStack
  },
  Profile: {
    screen: Profile
  }
}, {
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'white',
    swipeEnabled: false,
    style: {
      backgroundColor: '#BF4949',
      height: 60
    },
    tabStyle: {
      height: 60
    },
    iconStyle:{
      height: 60,
      width: 65
    },
    showIcon: true,
    showLabel: false,
  },
  tabBarPosition: 'bottom'
});

export const createRootNavigator = (signedIn = false) => {
  return SwitchNavigator({
    SignedIn: {
      screen: SignedIn
    },
    SignedOut: {
      screen: Login
    }
  }, {
    initialRouteName: signedIn
      ? "SignedIn"
      : "SignedOut"
  });
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
