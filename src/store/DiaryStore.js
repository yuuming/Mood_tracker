import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { observable, action } from 'mobx';
import _ from 'lodash';

const db = firebase.firestore();

export default class DiaryStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.accountStore = this.rootStore.accountStore;
    }

    comment = '';
    mood = '';
    date = null;
    id = '';

    @observable records = {};
    @observable moodCounter = {};

    @action
    async updateRecords(id) {
        this.records[this.date] = {
            comment: this.comment,
            date: this.date,
            mood: this.mood,
            id
        };
    }

    @action
    updateMoodCounter(year, month, mood) {
        console.log(this.moodCounter);
        this.moodCounter[year][month].moods[mood] = this.moodCounter[year][month].moods[mood] + 1;
        console.log(this.moodCounter);
    }

    writeDiary = () =>
        db.collection('users')
            .doc(this.accountStore.user.id)
            .collection('markedDates')
            .add({
                comment: this.comment,
                mood: this.mood,
                date: this.date
            })
            .then((ref) => {
                const year = this.date.slice(0, 4);
                const month = this.date.charAt(5) + this.date.charAt(6);

                console.log(year, month);
                this.updateRecords(ref.id);
                this.updateMoodCounter(year, month, this.mood);
            });

    editDiary = () =>
        db.collection('users')
            .doc(this.accountStore.user.id)
            .collection('markedDates')
            .doc(this.id)
            .update({
                comment: this.comment,
                mood: this.mood,
                date: this.date
            })
            .then(() => {
                const year = this.date.slice(0, 4);
                const month = this.date.charAt(5) + this.date.charAt(6);

                this.updateRecords(this.id);
                this.updateMoodCounter(year, month, this.mood);

                console.log(this.moodCounter);
            });

    clearData = () => {
        this.comment = '';
        this.mood = '';
        this.date = '';
        this.id = '';
    }
}
