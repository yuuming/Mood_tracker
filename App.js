/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import RootStore from './src/store/RootStore';
import MainPage from './src/MainPage';
import SplashScreen from 'react-native-smart-splash-screen';

export default class App extends Component {
  componentDidMount() {
    //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500
    });
  }

  render() {
    return (
      <Provider rootStore={new RootStore()}>
        <MainPage />
      </Provider>
    );
  }
}
