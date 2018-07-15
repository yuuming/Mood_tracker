import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { observable } from 'mobx';
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
    // diary[this.date] = {
    //     comment: this.comment,
    //     mood: this.mood
    // };

    writeDiary = () =>
        db.collection('users')
            .doc(this.accountStore.user.id)
            .collection('markedDates')
            .add({
                comment: this.comment,
                mood: this.mood,
                date: this.date
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
            });

    clearData = () => {
        this.comment = '';
        this.mood = '';
        this.date = '';
        this.id = '';
    }
}
