import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { observable, action } from 'mobx';
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

  user = {};

  @observable
  currentPaletteID = '';
  @observable
  isPending = false;
  @observable
  authError = null;
  @observable
  yearArray = [];

  @action
  async updateCurrentPalette(paletteID) {
    this.currentPaletteID = paletteID;
  }

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

        const yearTest = {};
        let monthTest = {};
        let element = {
          high: 0,
          happy: 0,
          neutral: 0,
          unhappy: 0,
          bad: 0
        };

        this.updateCurrentPalette(userRef.data().currentPalette);

        db.collection('users')
          .doc(user.uid)
          .collection('markedDates')
          .get()
          .then(subCollectionRef => {
            const docs = subCollectionRef.docs;

            const sortedDocs = _.sortBy(docs, doc => doc.data().date);
            this.yearArray = [];
            console.log(sortedDocs);
            _.forEach(sortedDocs, (doc, index) => {
              this.user.markedDates[doc.data().date] = {
                comment: doc.data().comment,
                date: doc.data().date,
                mood: doc.data().mood,
                id: doc.id
              };
          
                const yearNumber = sortedDocs[index].data().date.slice(0, 4);
                const isFound = _.find(
                  this.yearArray,
                  year => year === yearNumber
                );
                if (!isFound) {
                  this.yearArray.push(yearNumber);
                }


              // this.yearArray.push(sortedDocs[index].data().date.slice(0, 4));

              console.log(this.yearArray);
              console.log(Object.values(this.yearArray));

              this.yearArray = Object.values(this.yearArray);
              
              const year = doc.data().date.slice(0, 4);
              const month =
                doc.data().date.charAt(5) + doc.data().date.charAt(6);

              if (index > 0) {
                const previousMonth =
                  sortedDocs[index - 1].data().date.charAt(5) +
                  sortedDocs[index - 1].data().date.charAt(6);
                const previousYear = sortedDocs[index - 1]
                  .data()
                  .date.slice(0, 4);

                if (previousMonth !== month || previousYear !== year) {
                  element = {
                    high: 0,
                    happy: 0,
                    neutral: 0,
                    unhappy: 0,
                    bad: 0
                  };

                  if (previousYear !== year) {
                    monthTest = {};
                  }
                }
              }

              element[doc.data().mood] += 1;

              monthTest[month] = {
                moods: element
              };

              yearTest[year] = monthTest;

              this.updateCurrentPalette(this.user.currentPalette);
              this.rootStore.diaryStore.records = this.user.markedDates;
            });

            this.rootStore.diaryStore.moodCounter = yearTest;
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
    db.collection('users')
      .doc(this.user.id)
      .collection('selectedPalettes')
      .get()
      .then(subCollectionRef => {
        const docs = subCollectionRef.docs;

        _.forEach(docs, doc => {
          this.user.selectedPalettes = doc.data();
        });

        this.isPending = false;

        const today = this.rootStore.getToday();
        const year = today.slice(0, 4);
        const month = today.charAt(5) + today.charAt(6);

        this.rootStore.diaryStore.currentYear = year;
        Actions.monthly({ year, month });
      })
      .catch(err => {
        console.log(err);
      });
  };

  sendPasswordResetEmail = email =>
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('sent!');
      })
      .catch(err => {
        console.log(err);
      });
}
