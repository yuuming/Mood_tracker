import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { Calendar } from 'react-native-calendars';
import _ from 'lodash';
import firebase from 'react-native-firebase';

const db = firebase.firestore();

@inject('rootStore')
@observer
export default class Monthly extends Component {
    constructor(props) {
        super(props);
        this.rootStore = this.props.rootStore;
        this.accountStore = this.rootStore.accountStore;
        this.user = this.accountStore.user;
        this.year = this.props.year;
        this.month = this.props.month;
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

    // update() {
    //         db.collection('users').doc('nTagtkNQOddlqNyVmocDhU1NeaF3')
    //             .collection('markedDates')
    //             .doc('qyo9wDRp696WrDodIyds')
    //             .update(test);
    // }

    checkDate = (date) => {
        const today = new Date().toISOString().split('T')[0];

        if (date > today) {
            alert('wait till this day comes! :)');
        } else if (!this.user.markedDates[date]) {
            alert('there is no record for this day! :(');
        } else {
            Actions.addPost({ date, post: this.user.markedDates[date], selectedPaletteID: this.selectedPaletteID });
        }
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
});

const test = {
    '2018-07-04': {
        mood: 'unhappy',
        comment: 'last hang-out with my friend',
        customStyles: {
            container: {
                backgroundColor: '#E8B4E0',
                borderRadius: 0,
            },
            text: {
                color: 'white',
            },
        },
    },
    '2018-07-05': {
        mood: 'bad',
        comment: 'My friend left Canada today...',
        customStyles: {
            container: {
                backgroundColor: '#F6D9D8',
                borderRadius: 0,
            },
            text: {
                color: 'white',
            },
        },
    },
    '2018-07-06': {
        mood: 'high',
        comment: 'Cakes from Thierry are always irresistable',
        customStyles: {
            container: {
                backgroundColor: '#7EB6E2',
                borderRadius: 0,
            },
            text: {
                color: 'white',
            },
        },
    },
    '2018-07-02': {
        mood: 'unhappy',
        comment: 'I was sick',
        customStyles: {
            container: {
                backgroundColor: '#F6D9D8',
                borderRadius: 0,
            },
            text: {
                color: 'white',
            },
        },
    },
    '2018-07-07': {
        mood: 'happy',
        comment: 'I watched the Deadpool 2!',
        customStyles: {
            container: {
                backgroundColor: '#E8B4E0',
                borderRadius: 0,
            },
            text: {
                color: 'white',
            },
        },
    },
    '2018-07-08': {
        mood: 'high',
        comment: 'I felt fulfilled to implement some features',
        customStyles: {
            container: {
                backgroundColor: '#DDF2F4',
                borderRadius: 0,
            },
            text: {
                color: 'white',
            },
        },
    },
    '2018-07-01': {
        mood: 'neutral',
        comment: 'nothing special happened',
        customStyles: {
            container: {
                backgroundColor: '#EFCBE0',
                borderRadius: 0,
            },
            text: {
                color: 'white',
            },
        },
    }
};
