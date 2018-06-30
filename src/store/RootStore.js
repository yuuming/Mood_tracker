import firebase from 'react-native-firebase';
import AccountStore from './AccountStore';

const db = firebase.firestore();

export default class RootStore {
  constructor() {
    this.accountStore = new AccountStore(this);
  }
}
