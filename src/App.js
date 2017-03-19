import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'React Native Aww',
  };

  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

const AwwApp = StackNavigator({
  Home: { screen: HomeScreen },
});

AppRegistry.registerComponent('ReactNativeAww', () => AwwApp);
