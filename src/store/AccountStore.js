import firebase from 'react-native-firebase';

const db = firebase.firestore();

export default class AccountStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
