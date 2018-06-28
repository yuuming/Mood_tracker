import React, { Component } from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react';
import SignIn from './screens/SignIn';
import Monthly from './screens/Monthly';

@inject('rootStore')
@observer
export default class MainPage extends Component {
    render() {
        return (
            <Router>
                <Stack key='root' >
                    <Scene
                        key='signIn'
                        component={SignIn}
                        initial
                    />
                    <Scene
                        key='monthly'
                        component={Monthly}
                    />
                </Stack>
            </Router>
        );
    }
}