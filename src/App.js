import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import HomeScreen from './HomeScreen/HomeScreen';

const AwwAppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
});

const logger = createLogger({
  duration: true,
});

const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

export default class AwwApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <AwwAppNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ReactNativeAww', () => AwwApp);
