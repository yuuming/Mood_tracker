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
    // diary[this.date] = {
    //     comment: this.comment,
    //     mood: this.mood
    // };

    writeDiary = () =>
        db.collection('users')
            .doc(this.accountStore.user.id)
            .collection('markedDates')
            .update({
                comment: this.comment,
                mood: this.mood,
                date: this.date
            });
}
