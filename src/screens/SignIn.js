import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { observer, inject, Actions } from 'mobx-react';

@inject('rootStore')
@observer
export default class SignIn extends Component {
        constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>{ Actions.monthly();}}
                >
                <Text>SignIn Page!</Text>
                </TouchableOpacity>
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
