import firebase from 'react-native-firebase';
import AccountStore from './AccountStore';
import DiaryStore from './DiaryStore';

const db = firebase.firestore();

export default class RootStore {
  constructor() {
    this.accountStore = new AccountStore(this);
    this.diaryStore = new DiaryStore(this);
    this.defaultMoodPaletteImage =
      'https://firebasestorage.googleapis.com/v0/b/mood-tracker-d0d3d.appspot.com/o/assortment-bright-candy-1093911.jpg?alt=media&token=f346b0f8-1757-4806-8194-2832b5d930b2';
  }
  moodPaletteList = {};

  getToday = () => {
    const today = new Date();
    var month = '' + (today.getMonth() + 1);
    var day = '' + today.getDate();
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
        console.log(querySnapshot);
        for (let i = 0; i < querySnapshot.docs.length; ++i) {
          console.log('loadMoodePaletteList in RootStore');
          const moodPaletteInfo = querySnapshot.docs[i].data();
          console.log(moodPaletteInfo);
          // this.moodPaletteList = moodPaletteInfo;
          this.moodPaletteList[querySnapshot.docs[i].id] = moodPaletteInfo;
          // this.moodPaletteList = querySnapshot.docs.data();
          console.log(this.moodPaletteList);
        }
      });
}
