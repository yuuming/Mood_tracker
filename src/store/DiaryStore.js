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

    @action
    async updateRecords(id) {
        this.records[this.date] = {
            comment: this.comment,
            mood: this.mood,
            id,
            customStyles: {
                container: {
                    backgroundColor: this.rootStore.moodPaletteList[this.accountStore.user.currentPalette].moodColors[this.mood],
                    borderRadius: 0
                },
                text: {
                    color: 'white'
                }
            }
        };
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
                this.updateRecords(ref.id);
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
                this.updateRecords(this.id);
            });

    clearData = () => {
        this.comment = '';
        this.mood = '';
        this.date = '';
        this.id = '';
    }
}
