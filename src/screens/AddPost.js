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
        this.diaryStore = this.rootStore.diaryStore;
        this.selectedPaletteID = this.props.selectedPaletteID;
        this.palette = this.rootStore.moodPaletteList[this.selectedPaletteID].moodColors;
        this.date = this.props.date;
        this.post = this.diaryStore.records[this.date];
        this.today = this.rootStore.getToday();
        this.isToday = (this.today === this.date);
        this.mood = '';

        this.state = {
            colorForToday: '',
            comment: ''
        };
    }

    componentWillMount() {
        this.diaryStore.date = this.date;

        console.log(this.post);
        if (this.post) {
            this.setState({
                colorForToday: this.palette[this.post.mood]
            });

            if (this.post.id) {
                this.diaryStore.id = this.post.id;
                console.log('AddPost', this.post.id);
            }
        }
    }

    componentWillUnmount() {
        console.log('cleareData is called');
        this.diaryStore.clearData();
    }

    renderMoodSettingBar() {
        return (
            _.map(MOODS, (mood, index) =>
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        if (this.isToday) {
                            this.setState({ colorForToday: this.palette[mood] });
                            this.mood = mood;
                            this.diaryStore.mood = mood;
                        }
                    }}
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
                    {!this.isToday ?
                        <Text style={styles.textStyle}>{this.post.comment || ''}</Text> :
                        <TextInput
                            onChangeText={(comment) => { this.diaryStore.comment = comment; }}
                            value={this.post ? this.post.comment : ''}
                            multiline
                            maxLength={470}
                        />
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
        marginTop: 20,
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 16
    },
});
