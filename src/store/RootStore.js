import firebase from 'react-native-firebase';
import AccountStore from './AccountStore';
import _ from 'lodash';

const db = firebase.firestore();

export default class RootStore {
  constructor() {
    this.accountStore = new AccountStore(this);
    this.defaultMoodPaletteImage =
      'https://firebasestorage.googleapis.com/v0/b/mood-tracker-d0d3d.appspot.com/o/assortment-bright-candy-1093911.jpg?alt=media&token=f346b0f8-1757-4806-8194-2832b5d930b2';
    this.selectedPaletteID = '';
  }
  moodPaletteList = {};

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

  updateSelectPalette() {
    console.log('updateSelectPalette is called');
    const user = this.accountStore.user;
    console.log(user);
    console.log(this.selectedPaletteID);

    console.log('inside the block');

    db.collection('users')
      .doc(user.id)
      .update({
        currentPalette: this.selectedPaletteID
      })
      .then(() => {
        console.log('successful');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
