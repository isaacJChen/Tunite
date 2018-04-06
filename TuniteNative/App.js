import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Title from './src/Components/Title';
import Collection from './src/Screens/Collection';
import Profile from './src/Screens/Profile';
import Feed from './src/Screens/Feed';
import SongDetail from './src/Screens/SongDetail'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
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
const CollectionStack = StackNavigator({
  Collection: { screen: Collection },
  SongDetail: { screen: SongDetail },

});

export default TabNavigator({
  Feed: { screen: Feed },
  Collection: { screen: CollectionStack },
  Profile: { screen: Profile }
},
{
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'white',
  },
  tabBarPosition: 'bottom',
});

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
