import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';
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
      isDialogVisible: false,
      isCalendarMode: true,
    };

    this.rootStore = this.props.rootStore;
    this.accountStore = this.rootStore.accountStore;
    this.diaryStore = this.rootStore.diaryStore;

    this.user = this.accountStore.user;
    this.year = this.props.year;
    this.month = this.props.month;
    this.date = null;
    this.isToday = null;
  }

  // to check whether it's today or not
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

  // to assign new value to the current month variable which you're seeing
  handleChangedDate = (date) => {
    const { year, month } = date;

    if (month.toString().length !== 1) {
      this.month = month.toString();
    } else {
      this.month = `0${month}`;
    }

    this.year = year.toString();
  }

  storeDiary = () => {
    if (this.diaryStore.comment && (this.diaryStore.mood || this.diaryStore.originalMood)) {
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

  filterRecords = (record) => {
    const year = record.date.slice(0, 4);
    const month = record.date.charAt(5) + record.date.charAt(6);

    return (year === this.year && month === this.month);
  }

  renderCalendar() {
    const selectedPalette = this.rootStore.moodPaletteList[this.accountStore.currentPaletteID];
    const datasource = {};

    _.map(this.diaryStore.records, item => {
      datasource[item.date] = {
        mood: item.mood,
        comment: item.comment,
        date: item.date,
        id: item.id,
        customStyles: {
          container: {
            backgroundColor: selectedPalette.moodColors[item.mood],
            borderRadius: 0
          },
          text: {
            color: 'white'
          }
        }
      };
    });

    return (
      <Calendar
        style={{
          width: 350,
          height: 500
        }}
        markedDates={datasource}
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
        onMonthChange={(date) => { this.handleChangedDate(date); }}
      />
    );
  }

  renderDiary(item) {
    const selectedPalette = this.rootStore.moodPaletteList[this.accountStore.currentPaletteID];

    return (
      <View style={{ padding: 30, margin: 30, height: 350, borderWidth: 1, borderColor: 'gray' }}>
        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
          <View
            style={{
              backgroundColor: selectedPalette.moodColors[item.item.mood],
              height: 60,
              width: 60,
            }}
          />
          <View style={{ justifyContent: 'space-around', marginLeft: 30 }}>
            <Text>{item.item.date}</Text>
            <Text>{item.item.mood}</Text>
          </View>
        </View>
        <Text>{item.item.comment}</Text>
      </View>
    );
  }

  renderDialog(date) {
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
          <View style={styles.alertView}>
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
            <AddPost date={date} />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const dataSource = _.sortBy(this.diaryStore.records, record => record.date);

    return (
      <View style={styles.container}>
        {this.state.isCalendarMode ?
          this.renderCalendar()
          :
          <FlatList
            style={{ width: '100%' }}
            data={_.filter(dataSource, record => this.filterRecords(record))}
            keyExtractor={item => item.id}
            renderItem={item => this.renderDiary(item)}
            ListEmptyComponent={<EmptyComponent />}
          />
        }
        {this.state.isDialogVisible
          ? this.renderDialog(this.date)
          : null}
        <TouchableOpacity
          onPress={() =>
            Actions.ColourPalette()
          }
        >
          <Text>go to colourPalette page!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.Yearly({ year: this.year })}>
          <Text>Yearly Page!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.setState({ isCalendarMode: !this.state.isCalendarMode })
          }
        >
          <Text>different Mode</Text>
        </TouchableOpacity>
      </View >
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
  alertView: {
    justifyContent: 'space-around',
    backgroundColor: '#f4f4f4',
    height: 300,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7
  }
});

const EmptyComponent = () => (
  <View style={{ flex: 1, marginTop: 300, justifyContent: 'center', alignItems: 'center' }}>
    <Text>There's no record to show for this month!</Text>
  </View>
);
