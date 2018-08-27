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
  originalMood = '';
  date = null;
  id = '';

  // For Monthly.js & Yearly.js
  @observable
  currentYear = '';
  @observable
  dataSource = [];
  @observable
  dataSourceNew = [];

  // For writing records in Monthly.js
  @observable
  records = {};
  @observable
  moodCounter = {};

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
    if (this.moodCounter[year][month]) {
      this.moodCounter[year][month].moods[mood] =
        this.moodCounter[year][month].moods[mood] + 1;
      this.moodCounter[year][month].moods[this.originalMood] =
        this.moodCounter[year][month].moods[this.originalMood] - 1;
    }
  }

  writeDiary = () =>
    db
      .collection('users')
      .doc(this.accountStore.user.id)
      .collection('markedDates')
      .add({
        comment: this.comment,
        mood: this.mood,
        date: this.date
      })
      .then(ref => {
        const year = this.date.slice(0, 4);
        const month = this.date.charAt(5) + this.date.charAt(6);

        console.log(year, month);
        this.updateRecords(ref.id);
        this.updateMoodCounter(year, month, this.mood);
      });

  editDiary = () =>
    db
      .collection('users')
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
  };

  createMonthlyData = () => {
    this.dataSourceNew = [];
    this.dataSource = [];
    let stringMonth;
    for (i = 1; i <= 12; i++) {
      if (i.toString().length === 1) {
        stringMonth = `0${i.toString()}`;
      } else {
        stringMonth = i;
      }
      const obj1 = {
        month: stringMonth,
        moods: ''
      };
      this.dataSourceNew.push(obj1);
    }
    console.log('=====currentYear====', this.currentYear);
    _.forEach(this.moodCounter[this.currentYear], (element, key) => {
      const obj = {
        month: key,
        moods: element.moods
      };
      this.dataSource.push(obj);
    });
    console.log('==========dataSourceNew.length=======', this.dataSourceNew.length);
    for (let i = 0; i < this.dataSourceNew.length; i++) {
      for (let j = 0; j < this.dataSource.length; j++) {
        if (this.dataSourceNew[i].month === this.dataSource[j].month) {
          this.dataSourceNew[i] = this.dataSource[j];
        }
      }
    }

    console.log('$$$$$$$$$$$$$$$', this.dataSourceNew);
  };
}
