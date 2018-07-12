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


    writeDiary = () => {
        // const date1 = this.date; //2018-07-05
        // const obj = {
        //     comment: this.comment,
        //     mood: this.mood,
        //     date: date1
        // };

        // db.collection('users')
        //     .doc(this.accountStore.user.uid)
        //     .collection('markedDates')
        //     .doc('201807')
        //     .add(diary);
    }

}
