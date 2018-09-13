import React, { Component } from 'react';
import { Scene, Router, Stack, ActionConst, ActionConst } from 'react-native-router-flux';
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
  render() {
    return (
      <Router>
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
