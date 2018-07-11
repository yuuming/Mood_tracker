import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';

const MOODS = ['high', 'happy', 'neutral', 'unhappy', 'bad'];

@inject('rootStore')
@observer
export default class AddPost extends Component {
    constructor(props) {
        super(props);

        this.rootStore = this.props.rootStore;
        this.accountStore = this.rootStore.accountStore;
        this.selectedPaletteID = this.props.selectedPaletteID;
        this.palette = this.rootStore.moodPaletteList[this.selectedPaletteID].moodColors;
        this.date = this.props.date;
        this.post = this.accountStore.user.markedDates[this.date];

        this.state = {
            colorForToday: ''
        };
    }

    componentWillMount() {
        console.log(this.post);
        if (this.post) {
            this.setState({
                colorForToday: this.palette[this.post.mood]
            });
        }

        // console.log(this.props);
        // console.log(this.props.post);
        // console.log(this.props);
        // console.log(this.colorForToday);
        // console.log(this.rootStore.moodPaletteList[this.selectedPaletteID]);
    }

    renderMoodSettingBar() {
        console.log('function called!');

        return (
            _.map(MOODS, (mood) =>
                <TouchableOpacity
                    onPress={() => { this.setState({ colorForToday: this.palette[mood] }); }}
                    activeOpacity={1}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: this.palette[mood],
                            height: 60,
                            width: 60,
                            borderColor: this.state.colorForToday === this.palette[mood] ? 'blue' : null,
                            borderWidth: this.state.colorForToday === this.palette[mood] ? 2 : 0
                        }}
                    />
                </TouchableOpacity>
            ));
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{ width: '90%', height: 60, flexDirection: 'row' }}
                >
                    {this.renderMoodSettingBar()}
                </View>
                <ScrollView style={{ width: '90%', backgroundColor: 'white', margin: 15 }}>
                    {this.post ?
                        <Text style={styles.textStyle}>{this.post.comment || ''}</Text> :
                        <TextInput />
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    textStyle: {
        marginLeft: 30,
        marginTop: 20,
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 16
    },
});

const colorSquare = color => (
    <TouchableOpacity
        onPress={() => { console.log(color, colorForToday); }}
    >
        <View
            style={{
                backgroundColor: color,
                // flex: 1,
                height: 60,
                width: 60,
            }}
        />
    </TouchableOpacity>
);
