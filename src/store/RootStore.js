import firebase from 'react-native-firebase';
import AccountStore from './AccountStore';
import _ from 'lodash';
import DiaryStore from './DiaryStore';

const db = firebase.firestore();

export default class RootStore {
  constructor() {
    this.accountStore = new AccountStore(this);
    this.diaryStore = new DiaryStore(this);
    this.defaultMoodPaletteImage =
      'https://firebasestorage.googleapis.com/v0/b/mood-tracker-d0d3d.appspot.com/o/assortment-bright-candy-1093911.jpg?alt=media&token=f346b0f8-1757-4806-8194-2832b5d930b2';
    this.selectedPaletteID = '';
  }
  moodPaletteList = {};

  getToday = () => {
    const today = new Date();
    let month = '' + (today.getMonth() + 1);
    let day = '' + today.getDate();
    const year = today.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
  }

  loadMoodPaletteList = () =>
    db
      .collection('moodPalette')
      .get()
      .then(querySnapshot => {
        _.forEach(querySnapshot.docs, doc => {
          console.log('loadMoodePaletteList in RootStore');
          const moodPaletteInfo = doc.data();
          this.moodPaletteList[doc.id] = moodPaletteInfo;
          console.log(this.moodPaletteList);
        });
      });

  updateSelectPalette = () =>
    db.collection('users')
      .doc(this.accountStore.user.id)
      .update({
        currentPalette: this.selectedPaletteID
      })
      .then(() => {
        console.log('successful');
        this.accountStore.updateCurrentPalette(this.selectedPaletteID);
      })
      // .catch(err => {
      //   console.log(err);
      // });
}
