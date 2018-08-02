import React, { Component } from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { inject } from 'mobx-react';

@inject('rootStore')
export default class ResetEmailDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            email: '',
            isInputReady: false
        };
    }

    componentWillMount() {
        console.log('componentWillMount in ResetEmailDialog');
        console.log(this.props.isVisible);
        this.setState({
            modalVisible: true
        });
    }

    componentWillUnmount() {
        this.props.closeDialog();
    }

    // setModalVisible(visible) {
    //     this.setState({ modalVisible: visible });
    // }

    render() {
        return (
            // <View style={{ margin: 100, justifyContent: 'center', alignItems: 'center' }}>
            <Modal
                animationType='none'
                transparent
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}
            >
                <View style={{ marginTop: 180, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#f4f4f4', width: 260, height: 200, borderRadius: 5, borderWidth: 0.5 }}>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <Text>Email </Text>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                enablesReturnKeyAutomatically
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                            <Button
                                onPress={() => {
                                    this.setState({
                                        modalVisible: false
                                    });
                                }}
                                title='Cancel'
                            />
                            <Button
                                title='Send'
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    textInputStyle: {
        height: 25,
        width: 200,
        marginLeft: 2,
        borderColor: 'gray',
        borderWidth: 0.5,
        backgroundColor: 'white'
    },
});
