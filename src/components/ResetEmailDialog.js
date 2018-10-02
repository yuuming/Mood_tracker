import React, { Component } from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
import { inject } from 'mobx-react';

@inject('rootStore')
export default class ResetEmailDialog extends Component {
    constructor(props) {
        super(props);

        this.rootStore = this.props.rootStore;
        this.accountStore = this.rootStore.accountStore;
        this.state = {
            modalVisible: false,
            email: '',
            isInputReady: false
        };
    }

    componentWillMount() {
        this.setState({
            modalVisible: !this.state.modalVisible,
            isInputReady: false
        });
    }

    closeDialog() {
        this.setState({
            modalVisible: !this.state.modalVisible
        }, () => {
            this.props.closeDialog(this.state.isInputReady);
        });
    }

    sendPasswordResetEmail() {
        this.accountStore.sendPasswordResetEmail(this.state.email)
            .then(() => {
                this.setState({
                    isInputReady: true
                }, () => {
                    this.props.closeDialog(this.state.isInputReady);
                });
            })
            .catch((err) => {
                console.log(err);
                alert('please try it again');
            });
    }

    render() {
        return (
            <Modal
                animationType='none'
                transparent
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.dialogStyle}>
                        <View style={styles.alarmMessageStyle}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', lineHeight: 25 }}>Please type your email</Text>
                            <Text style={{ fontSize: 12 }}>We'll send you the link to reset the password!</Text>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                enablesReturnKeyAutomatically
                                keyboardType="email-address"
                                autoCapitalize="none"
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.buttonContainerStyle}>
                            <View style={{ flex: 1 }}>
                                <Button
                                    onPress={() => { this.closeDialog(); }}
                                    title='Cancel'
                                />
                            </View>
                            <View style={{ borderLeftWidth: 0.5, borderColor: '#cfcfcf', flex: 1 }}>
                                <Button
                                    onPress={() => { this.sendPasswordResetEmail(); }}
                                    title='Send'
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    textInputStyle: {
        height: 38,
        width: '100%',
        marginLeft: 2,
        borderColor: 'gray',
        borderWidth: 0.5,
        backgroundColor: 'white'
    },
    modalStyle: {
        marginTop: 230,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogStyle: {
        backgroundColor: '#f4f4f4',
        width: 260,
        height: 170,
        borderRadius: 5,
        justifyContent: 'space-between'
    },
    alarmMessageStyle: {
        marginTop: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainerStyle: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: '#cfcfcf',
        justifyContent: 'space-around'
    }
});
