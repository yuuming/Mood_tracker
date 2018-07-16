import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { observable } from 'mobx';
import _ from 'lodash';
import {
  WRONG_PASSWORD,
  USER_NOT_FOUND,
  EMAIL_ALREADY_IN_USE
} from '../../Utils/Const';

const db = firebase.firestore();

export default class AccountStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }


  @observable isPending = false;
  @observable authError = null;

  signUp = (email, password) => {
    this.authError = null;
    this.isPending = true;

    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(auth => {
        this.saveUser(auth.user._user);
      })
      .catch(err => {
        this.isPending = false;

        switch (err.code) {
          case 'auth/email-already-in-use':
            this.authError = EMAIL_ALREADY_IN_USE;
            break;
          default:
            console.log(err);
        }
      });
  };

  signIn = (email, password) => {
    this.authError = null;
    this.isPending = true;

    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then(auth => {
        this.getUser(auth.user._user);
      })
      .catch(err => {
        this.isPending = false;

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
        }
      });
  };

  saveUser = user => {
    db.collection('users')
      .doc(user.uid)
      .set({
        id: user.uid,
        joinedDate: new Date(),
        email: user.email,
        obtainedPalette: {}
      })
      .then(() => {
        this.getUser(user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getUser = user => {
    db.collection('users')
      .doc(user.uid)
      .get()
      .then(userRef => {
        this.user = userRef._data;
        this.user.markedDates = {};

        db.collection('users').doc(user.uid)
          .collection('markedDates').get()
          .then((subCollectionRef) => {
            const docs = subCollectionRef.docs;
            console.log(this.user);
            console.log(docs);
            _.forEach(docs, (doc) => {
              // this.user.markedDates = doc.data();
              this.user.markedDates[doc.data().date] = {
                comment: doc.data().comment,
                mood: doc.data().mood,
                id: doc.id
              };

              this.rootStore.diaryStore.records = this.user.markedDates;
            });
          })
          .then(() => {
            this.getSelectedPalettes();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getSelectedPalettes = () => {
    db.collection('users').doc(this.user.id)
      .collection('selectedPalettes').get()
      .then((subCollectionRef) => {
        const docs = subCollectionRef.docs;

        _.forEach(docs, (doc) => {
          this.user.selectedPalettes = doc.data();
        });

        this.isPending = false;
        Actions.monthly({ year: '2018', month: '07' });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // getMoodPalettes = () => {
  //   db.collection('moodPalette').get()
  //     .then((ref) => {
  //       const docs = ref.docs;

  //       _.forEach(docs, (doc) => {
  //         this.moodPalettes[doc.id] = doc.data();
  //       });

  //       this.isPending = false;
  //       Actions.monthly({ year: '2018', month: '07' });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}
