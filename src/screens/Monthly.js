import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal, Button, Alert } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { Calendar } from 'react-native-calendars';
import _ from 'lodash';
import firebase from 'react-native-firebase';
import AddPost from './AddPost';

const db = firebase.firestore();

@inject('rootStore')
@observer
export default class Monthly extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDialogVisible: false
        };

        this.rootStore = this.props.rootStore;
        this.accountStore = this.rootStore.accountStore;
        this.user = this.accountStore.user;
        this.year = this.props.year;
        this.month = this.props.month;
        this.date = null;
        this.selectedPaletteID = this.user.selectedPalettes[this.year][this.month];
    }

    componentWillMount() {
        const selectedPaletteID = this.user.selectedPalettes[this.year][this.month];
        const selectedPalette = this.rootStore.moodPaletteList[selectedPaletteID];

        console.log(this.rootStore.moodPaletteList);
        console.log(selectedPaletteID);
        console.log(selectedPalette);

        console.log(this.user);

        _.map(this.user.markedDates, (item) => {
            item.customStyles.container.backgroundColor = selectedPalette.moodColors[item.mood];
        });
    }

    checkDate = (date) => {
        this.date = date;
        const today = new Date().toISOString().split('T')[0];

        console.log(date);
        if (date > today) {
            alert('wait till this day comes! :)');
        } else if (!this.user.markedDates[date]) {
            alert('there is no record for this day! :(');
        } else {
            this.setState({ isDialogVisible: true });
        }

        // console.log(this.state.isDialogVisible);
        // if (this.state.isDialogVisible) {
        //     console.log('test');
        //     this.renderDialog(date, this.user.markedDates[date], this.selectedPaletteID);
        //     // Actions.addPost({ date, post: this.user.markedDates[date], selectedPaletteID: this.selectedPaletteID });    
        // }
    }

    renderDialog(date, selectedPaletteID) {
        return (
            <Modal
                visible={this.state.isDialogVisible}
                transparent
                animationType={'fade'}
                onRequestClose={() => { this.setState({ isDialogVisible: !this.state.isDialogVisible }); }}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.Alert_Main_View}>
                        <AddPost date={date} selectedPaletteID={selectedPaletteID} />
                        {/* <Text style={styles.Alert_Title}>Custom Alert Dialog Title.</Text>
                    <View style={{ width: '100%', height: 2, backgroundColor: '#fff' }} />
                    <Text style={styles.Alert_Message}> Are You Sure(Alert Dialog Message). </Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#fff' }} />
                    <View style={{ flexDirection: 'row', height: '30%' }}> */}
                        {/* <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={this.ok_Button}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.TextStyle}> OK </Text>
                        </TouchableOpacity>
                        <View style={{ width: 1, height: '100%', backgroundColor: '#fff' }} />
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => { this.setState({ isDialogVisible: !this.state.isDialogVisible }); }}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.TextStyle}> CANCEL </Text> */}
                        {/* </TouchableOpacity> */}
                    </View>
                </View>
                {/* </View> */}
            </Modal>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Calendar
                    style={{
                        width: 350,
                        height: 500
                    }}
                    // markedDates={test}
                    markedDates={this.user.markedDates}
                    markingType={'custom'}
                    // hideArrows
                    theme={{
                        'stylesheet.calendar.header': {
                            monthText: {
                                fontSize: 18,
                                fontWeight: '600',
                                margin: 10,
                            },
                            arrow: {
                                width: 0,
                                height: 0,
                                padding: 10,
                            },
                        }
                    }}
                    onDayPress={(day) => { this.checkDate(day.dateString); }}
                />
                {this.state.isDialogVisible ? this.renderDialog(this.date, this.selectedPaletteID) : null}
                <TouchableOpacity onPress={() => Actions.colourPalette()}>
                    <Text>go to colourPalette page!</Text>
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
        backgroundColor: 'white',
    },
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (Platform.OS === 'ios') ? 20 : 0
    },
    Alert_Main_View: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
        height: 350,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
    },
    Alert_Title: {
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        padding: 10,
        height: '28%'
    },
    Alert_Message: {
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
        padding: 10,
        height: '42%'
    },
    buttonStyle: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 22,
        marginTop: -5
    }
});
