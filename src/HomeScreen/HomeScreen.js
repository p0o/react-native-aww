import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import SwipeCards from 'react-native-swipe-cards';

import * as actionCreators from '../actions';

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
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const PhotoCard = ({ imageUri }) => (
  <View style={styles.wrapper}>
    <Image
      style={styles.image}
      source={{ uri: imageUri }}
      indicator={ProgressCircle}
    />
  </View>
);

@connect(
  state => ({
    items: state.items,
    itemsById: state.itemsById,
    fetching: state.fetching,
  }),
  dispatch => bindActionCreators({
    fetchItems: actionCreators.fetchItems,
    likeItem: actionCreators.likeItem,
    dislikeItem: actionCreators.dislikeItem,
  }, dispatch)
)
export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'React Native Aww',
  };

  componentDidMount() {
    this.props.fetchItems();
  }

  handleYup = (card) => {
    this.props.likeItem(card.id);
  };

  handleNope = (card) => {
    this.props.dislikeItem(card.id);
  };

  render() {
    const { items, itemsById, fetching } = this.props;
    const cards = items && items.map(item => itemsById[item]);

    if (fetching) {
      return (
        <View style={styles.spinner}>
          <ProgressCircle />
        </View>
      );
    }

    return (
      <View style={styles.wrapper}>
        <SwipeCards
          cards={cards}
          renderCard={(card) => <PhotoCard imageUri={card.preview} />}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
        />
      </View>
    );
  }
}
