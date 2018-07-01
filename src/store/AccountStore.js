import firebase from 'react-native-firebase';

const db = firebase.firestore();

export default class AccountStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  signUp = (email, password) => {
    console.log(`Sign up with ${email} ${password}`);
  }

  signIn = (email, password) => {
    console.log(`Sign in with ${email} ${password}`);
  }
}

