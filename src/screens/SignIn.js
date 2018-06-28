import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { observer, inject } from 'mobx-react';

@inject('rootStore')
@observer
export default class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>SignIn Page!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
