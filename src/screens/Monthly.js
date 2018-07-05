import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { Calendar } from 'react-native-calendars';

@inject('rootStore')
@observer
export default class Monthly extends Component {
    constructor(props) {
        super(props);
        this.rootStore = this.props.rootStore;
        this.accountStore = this.rootStore.accountStore;
        this.user = this.accountStore.user;
    }

    componentWillMount() {
        console.log(this.user.markedDates);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Monthly page!</Text>
                <Calendar
                    style={{
                        width: 350,
                        height: 500
                    }}
                    // markedDates={{
                    //     '2018-07-20': { selected: true, textColor: 'black', endingDay: true, color: 'green' },
                    //     '2018-07-22': { selected: true, endingDay: true, color: 'blue' },
                    //     '2018-07-23': { selected: true, endingDay: true, color: 'blue', textColor: 'white' },
                    //     '2018-07-04': { disabled: true, selected: true, endingDay: true, color: 'blue' }
                    // }}
                    markedDates={this.user.markedDates}
                    // markingType={'period'}
                    // hideArrows
                    theme={{
                        // arrowColor: 'black',
                        'stylesheet.calendar.header': {
                            monthText: {
                                fontSize: 15,
                                fontWeight: '600',
                                margin: 10,
                                borderWidth: 4,
                            },
                            arrow: {
                                width: 0,
                                height: 50,
                                padding: 10,
                                borderWidth: 4,
                                // color: 'black'
                            },
                            week: {
                                height: 30,
                                marginTop: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderWidth: 4,
                            }
                        }
                    }}
                />
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
