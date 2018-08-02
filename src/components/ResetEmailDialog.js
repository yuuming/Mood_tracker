import React, { Component } from 'react';
import {
    Platform,
    Modal,
    Text,
    TouchableHighlight,
    View
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
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}
                >
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setState({
                                        modalVisible: false
                                    });
                                }}
                            >
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
