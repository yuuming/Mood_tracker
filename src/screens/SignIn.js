import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { observer, inject } from 'mobx-react';
import ResetEmailDialog from '../components/ResetEmailDialog';

const { width } = Dimensions.get('window');
// const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
@inject('rootStore')
@observer
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmedPassword: '',
            isSignUpMode: false,
            isResetEmailDialogVisible: false,
            isEmailOffered: false
        };
        this.rootStore = this.props.rootStore;
        this.accountStore = this.rootStore.accountStore;
    }

    componentWillMount() {
        this.rootStore.loadMoodPaletteList();
        this.setState({
            isResetEmailDialogVisible: false
        });
    }

    switchMode = () => {
        this.setState({ isSignUpMode: !this.state.isSignUpMode });
    };

    clearAllFields = () => {
        this.setState({
            email: '',
            password: '',
            confirmedPassword: ''
        });
    };

    isDone = () => {
        const { email, password, confirmedPassword, isSignUpMode } = this.state;

        // if (!emailRegex.test(email)) {
        //     alert('email is wrong');
        //     return;
        // } else if (!passwordRegex.test(password)) {
        //     alert('password is wrong');
        //     return;
        // }

        if (isSignUpMode && password === confirmedPassword) {
            this.accountStore.signUp(email, password);
        } else if (!isSignUpMode) {
            this.accountStore.signIn(email, password);
        } else {
            alert('please confirm your password again!');
        }

        this.clearAllFields();
    };

    switchResetPasswordDialogVisibility = (isEmailOffered = false) => {
        console.log('switch!!');
        this.setState({
            isResetEmailDialogVisible: !this.state.isResetEmailDialogVisible,
            isEmailOffered
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.textInputContainer}>
                    <Text style={styles.textStyle}>Email</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        enablesReturnKeyAutomatically
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Text style={styles.textStyle}>Password</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry
                    />
                    {this.state.isSignUpMode ? (
                        <View>
                            <Text style={styles.textStyle}>Confirm Password</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={confirmedPassword =>
                                    this.setState({ confirmedPassword })
                                }
                                value={this.state.confirmedPassword}
                                secureTextEntry
                                enablesReturnKeyAutomatically
                                textContentType="password"
                            />
                        </View>
                    ) : null}
                    <TouchableOpacity onPress={this.isDone}>
                        <View style={styles.signInButtonStyle}>
                            <Text>{this.state.isSignUpMode ? 'Sign Up' : 'Sign In'}</Text>
                        </View>
                    </TouchableOpacity>
                    {this.accountStore.authError !== null ? (
                        <Text style={styles.errorTextStyle}>
                            {this.accountStore.authError}
                        </Text>
                    ) : null}
                    {this.state.isEmailOffered ?
                        <Text style={styles.resetEmailText}>
                            Link to reset your email is sent via email!
                        </Text>
                        : null}
                    <TouchableOpacity
                        onPress={() => { this.setState({ isResetEmailDialogVisible: true }); }}
                    >
                        <Text style={styles.touchableTextStyle}>Forgot your password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.switchMode}>
                        <Text style={styles.touchableTextStyle}>
                            {this.state.isSignUpMode
                                ? 'Ready to sign in?'
                                : 'Wanna create an account?'}
                        </Text>
                    </TouchableOpacity>
                    {this.state.isResetEmailDialogVisible ?
                        <ResetEmailDialog closeDialog={this.switchResetPasswordDialogVisibility} />
                        : null}
                </View>
                <View style={{ backgroundColor: '#F5FCFF', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                    {this.accountStore.isPending ? <ActivityIndicator /> : null}
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    textInputContainer: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF'
    },
    textStyle: {
        marginLeft: 30,
        marginTop: 20,
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 16
    },
    textInputStyle: {
        marginLeft: 30,
        marginTop: 5,
        height: 30,
        width: (width / 6) * 5,
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    signInButtonStyle: {
        marginLeft: 30,
        marginTop: 15,
        height: 40,
        width: (width / 6) * 5,
        backgroundColor: '#F4C2A6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    touchableTextStyle: {
        marginLeft: 30,
        marginTop: 10,
        textAlign: 'left',
        fontWeight: '300',
        fontSize: 14
    },
    errorTextStyle: {
        marginLeft: 30,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14,
        color: 'red'
    },
    resetEmailText: {
        marginLeft: 30,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 14,
        color: 'black'
    }
});
