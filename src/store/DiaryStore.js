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
      console.log(obj1);
      this.dataSourceNew.push(obj1);
    }
    console.log(this.dataSourceNew);
    _.forEach(this.diaryStore.moodCounter[this.year], (element, key) => {
      console.log(key);
      const obj = {
        month: key,
        moods: element.moods
      };
      console.log(obj);
      this.dataSource.push(obj);
    });

    for (let i = 0; i < this.dataSourceNew.length; i++) {
      console.log(this.dataSourceNew[i]);
      for (let j = 0; j < this.dataSource.length; j++) {
        console.log(this.dataSourceNew[i].month);
        console.log(this.dataSource[j].month);
        if (this.dataSourceNew[i].month === this.dataSource[j].month) {
          this.dataSourceNew[i] = this.dataSource[j];
        }
      }
    }
  };
}
