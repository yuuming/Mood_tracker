import React, { Component } from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react';
import SignIn from './screens/SignIn';
import Monthly from './screens/Monthly';
import ColourPalette from './screens/ColourPalette';
import AddPost from './screens/AddPost';
import ColourPaletteBar from './components/ColourPaletteBar';
import MoodPalette from './components/MoodPalette';
import Yearly from './screens/Yearly';

@inject('rootStore')
@observer
export default class MainPage extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar>
          <Scene key="signIn" component={SignIn} initial hideNavBar />
          {/* <Stack key='main'> */}
          <Scene key="monthly" component={Monthly} hideNavBar />
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
            // hideNavBar={false}
            // navBar={ColourPaletteBar}
          />
          <Scene
            key="MoodPalette"
            component={MoodPalette}
            // hideNavBar={false}
            // navBar={ColourPaletteBar}
          />
          <Scene key="addPost" component={AddPost} />
        </Stack>
      </Router>
    );
  }
}
