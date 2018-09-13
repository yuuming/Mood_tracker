import React, { Component } from 'react';
import { Scene, Router, Stack, ActionConst } from 'react-native-router-flux';
import { BackHandler } from 'react-native';
import { observer, inject } from 'mobx-react';
import SignIn from './screens/SignIn';
import Monthly from './screens/Monthly';
import ColourPalette from './screens/ColourPalette';
import AddPost from './screens/AddPost';
import ColourPaletteBar from './components/ColourPaletteBar';
import MoodPalette from './components/MoodPalette';
import Yearly from './screens/Yearly';
import YearlyBar from './components/YearlyBar';

@inject('rootStore')
@observer
export default class MainPage extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    console.log(Actions.currentScene);
    const currentScene = Actions.currentScene;
    // TODO :: Need to refactoring cause it needs to add everywhere.
    // Do not use string, define in constant.js and use enum instead or make check function.
    if (currentScene === '_main' || currentScene === 'main') {
      return false;
    }

    // default backbutton handling is Actions.pop();
    Actions.pop();
    return true;
  }

  render() {
    return (
      <Router
        backAndroidHandler={this.onBackPress}
      >
        <Stack key="root" hideNavBar>
          <Scene key="signIn" component={SignIn} initial hideNavBar />
          <Stack key='main'>
            <Scene
              key="main"
              component={Monthly}
              hideNavBar
              initial
              type={ActionConst.RESET}
            />
            <Scene
              key="ColourPalette"
              title="Colour Palette"
              component={ColourPalette}
              hideNavBar={false}
              navBar={ColourPaletteBar}
            />
            <Scene
              key="Yearly"
              component={Yearly}
              hideNavBar={false}
              navBar={YearlyBar}
            />
            <Scene
              key="MoodPalette"
              component={MoodPalette}
            // hideNavBar={false}
            // navBar={ColourPaletteBar}
            />
            <Scene key="addPost" component={AddPost} />
          </Stack>
        </Stack>
      </Router>
    );
  }
}
