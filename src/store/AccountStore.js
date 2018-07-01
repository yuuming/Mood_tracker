import firebase from 'react-native-firebase';
import { observable } from 'mobx';
import { WRONG_PASSWORD, USER_NOT_FOUND, EMAIL_ALREADY_IN_USE } from '../../Utils/Const';

const db = firebase.firestore();

export default class AccountStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable isSignedInSuccessfully = null;
  @observable user = null;
  @observable authError = null;

  signUp = (email, password) => {
    this.authError = null;

    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
            this.authError = EMAIL_ALREADY_IN_USE;
            break;
          default: 
            console.log(err);
            this.isSignedInSuccessfully = false;
        }
      });
  }

  signIn = (email, password) => {
    this.authError = null;

    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then((auth) => {
        this.isSignedInSuccessfully = true;
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/wrong-password':
            this.authError = WRONG_PASSWORD;
            break;
          case 'auth/user-not-found':
            this.authError = USER_NOT_FOUND;
            break;
          case 'auth/email-already-in-use':
            this.authError = EMAIL_ALREADY_IN_USE;
            break;
          default: 
            console.log(err);
            this.isSignedInSuccessfully = false;
        }
      });
  }
}
