import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

// requirements
import SwipeCards from 'react-native-swipe-cards';

// test components
import HomeScreen, { PhotoCard } from './HomeScreen';

test('should render HomeScreen correctly', () => {
  const tree = renderer.create(
    <HomeScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render PhotoCard correctly', () => {
  const tree = renderer.create(
    <PhotoCard />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test('should render PhotoCard with the imageUri props', () => {
  const mockImageUri = 'http://someUrl/photo.jpg';
  const tree = renderer.create(
    <PhotoCard imageUri={mockImageUri} />
  ).toJSON();
  const imageComponent = tree.children[0];
  expect(imageComponent.props.source).toEqual({ uri: mockImageUri });
});
