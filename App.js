/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import RootStore from './src/store/RootStore';
import MainPage from './src/MainPage';

export default class App extends Component {
  render() {
    return (
      <Provider rootStore={new RootStore()}>
        <MainPage />
      </Provider>
    );
  }
}
