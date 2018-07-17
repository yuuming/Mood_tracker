import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Actions } from 'react-native-router-flux';
import { Calendar } from 'react-native-calendars';
import _ from 'lodash';
import AddPost from './AddPost';

@inject('rootStore')
@observer
export default class Monthly extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDialogVisible: false
    };

    this.rootStore = this.props.rootStore;
    this.accountStore = this.rootStore.accountStore;
    this.diaryStore = this.rootStore.diaryStore;
    this.user = this.accountStore.user;
    this.year = this.props.year;
    this.month = this.props.month;
    this.date = null;
    this.selectedPaletteID = this.accountStore.currentPaletteID;
    this.isToday = null;
  }

  componentWillMount() {
    const selectedPalette = this.rootStore.moodPaletteList[this.selectedPaletteID];

    console.log('먼슬리');
    _.map(this.diaryStore.records, item => {
      console.log(item);

      item.customStyles = {
        container: {
          backgroundColor: selectedPalette.moodColors[item.mood],
          borderRadius: 0
        },
        text: {
          color: 'white'
        }
      };
    });
  }
  
  checkDate = date => {
    this.date = date;
    const today = this.rootStore.getToday();
    this.isToday = date === today;
    console.log(`today's date : ${today}`);
    console.log(`selected date : ${date}`);
    if (date > today) {
      alert('wait till this day comes! :)');
      return;
    }

    if (!this.user.markedDates[date] && date !== today) {
      alert('there is no record for this day! :(');
      return;
    }

    this.setState({ isDialogVisible: true });
  };

  storeDiary = () => {
    if (this.diaryStore.comment && this.diaryStore.mood) {
      if (this.diaryStore.id !== '') {
        this.diaryStore
          .editDiary()
          .then(() => {
            this.setState({ isDialogVisible: false });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.diaryStore
          .writeDiary()
          .then(() => {
            this.setState({ isDialogVisible: false });
          })
          .catch(err => {
            console.log(err);
          });
      }
    } else {
      alert('Fill out every field !');
    }
  };

  renderDialog(date, selectedPaletteID) {
    return (
      <Modal
        visible={this.state.isDialogVisible}
        transparent
        animationType={'fade'}
        onRequestClose={() => {
          this.setState({ isDialogVisible: !this.state.isDialogVisible });
        }}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={styles.Alert_Main_View}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 15
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    isDialogVisible: !this.state.isDialogVisible
                  });
                }}
              >
                <Text>Close</Text>
              </TouchableOpacity>
              <Text>{this.date}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.storeDiary();
                }}
              >
                <Text>{this.isToday ? 'Done' : ''}</Text>
              </TouchableOpacity>
            </View>
            <AddPost date={date} selectedPaletteID={selectedPaletteID} />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    console.log(this.accountStore.user.currentPalette);
    console.log(this.accountStore.currentPaletteID);
    console.log('렌더링');
    return (
      <View style={styles.container}>
        <Calendar
          style={{
            width: 350,
            height: 500
          }}
          markedDates={toJS(this.diaryStore.records)}
          markingType={'custom'}
          // hideArrows
          theme={{
            'stylesheet.calendar.header': {
              monthText: {
                fontSize: 18,
                fontWeight: '600',
                margin: 10
              },
              arrow: {
                width: 0,
                height: 0,
                padding: 10
              }
            }
          }}
          onDayPress={day => {
            this.checkDate(day.dateString);
          }}
        />
        {this.state.isDialogVisible
          ? this.renderDialog(this.date, this.selectedPaletteID)
          : null}
        <TouchableOpacity
          onPress={() =>
            Actions.ColourPalette({ selectedPaletteID: this.selectedPaletteID })
          }
        >
          <Text>go to colourPalette page!</Text>
        </TouchableOpacity>
        <Text>{this.accountStore.currentPaletteID}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  Alert_Main_View: {
    justifyContent: 'space-around',
    backgroundColor: '#f4f4f4',
    height: 300,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7
  }
});
