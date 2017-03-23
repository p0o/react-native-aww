import React, { Component } from 'react';
import { AppRegistry, Image, Text, View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SwipeCards from 'react-native-swipe-cards';

// temporarily hardcoded
const dogPhoto1 = 'https://i.redditmedia.com/t1KLBI5M8dhEvR0rNjDaOrHNLIrSxomY0Kp29zjeijc.jpg?s=5d60f4a8695f13ca2a0d7da4c008c288';
const dogPhoto2 = 'https://i.redditmedia.com/Bi9zaToQzQurkI7SvweFYiasebXnifkch2tNSNVxp10.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=960&amp;s=8828ef2382bf8d775263f86a6b3b2ec4';

const data = [dogPhoto1, dogPhoto2];

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
});

export const PhotoCard = ({ imageUri }) => (
  <View style={styles.wrapper}>
    <Image
      style={styles.image}
      source={{ uri: imageUri }}
    />
  </View>
);

export class HomeScreen extends Component {
  static navigationOptions = {
    title: 'React Native Aww',
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <SwipeCards
          cards={data}
          renderCard={(imageUri) => <PhotoCard imageUri={imageUri} />}
        />
      </View>
    );
  }
}

const AwwApp = StackNavigator({
  Home: { screen: HomeScreen },
});

AppRegistry.registerComponent('ReactNativeAww', () => AwwApp);
