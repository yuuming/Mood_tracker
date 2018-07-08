import React, { Component } from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react';
import SignIn from './screens/SignIn';
import Monthly from './screens/Monthly';
import ColourPalette from './screens/ColourPalette';
import AddPost from './screens/AddPost';

@inject('rootStore')
@observer
export default class MainPage extends Component {
    render() {
        return (
            <Router>
                <Stack key='root' >
                    {/* <Scene
                        key='signIn'
                        component={SignIn}
                        initial
                        hideNavBar
                    /> */}
                    {/* <Stack key='main'> */}
                        <Scene
                            key='monthly'
                            component={Monthly}
                            initial
                        />
                        <Scene
                            key='colourPalette'
                            component={ColourPalette}
                        />
                    <Scene
                        key='addPost'
                        component={AddPost}
                    />
                </Stack>
            </Router>
        );
    }
}
