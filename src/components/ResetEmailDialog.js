import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { inject } from 'mobx-react';

@inject('rootStore')
export default class ResetEmailDialog extends Component {
    constructor(props) {
        super(props);

        this.state({
            email: '',
            isInputReady: false
        });
    }

    render() {
        return (
            <View>
                <Text>modal view</Text>
            </View>
        );
    }
}
