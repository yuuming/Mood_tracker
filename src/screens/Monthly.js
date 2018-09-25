import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform
} from 'react-native';
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
      isCalendarMode: true
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
  handleChangedDate = date => {
    const { year, month } = date;

    if (month.toString().length !== 1) {
      this.month = month.toString();
    } else {
      this.month = `0${month}`;
    }

    this.year = year.toString();
  };

  storeDiary = () => {
    if (
      this.diaryStore.comment &&
      (this.diaryStore.mood || this.diaryStore.originalMood)
    ) {
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

  filterRecords = record => {
    const year = record.date.slice(0, 4);
    const month = record.date.charAt(5) + record.date.charAt(6);

    return year === this.year && month === this.month;
  };

  shiftViewMode = () => {
    this.setState({ isCalendarMode: !this.state.isCalendarMode });
  };

  closeDialog = () => {
    this.setState({ isDialogVisible: !this.state.isDialogVisible });
  };

  renderCalendar() {
    const selectedPalette = this.rootStore.moodPaletteList[
      this.accountStore.currentPaletteID
    ];
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
          paddingTop: 10,
          width: 350,
          height: '90%',
        }}
        markedDates={datasource}
        markingType={'custom'}
        theme={{
          'stylesheet.calendar.header': {
            monthText: {
              fontSize: 18,
              fontWeight: '600',
              margin: 10
            },
          }
        }}
        current={`${this.year}-${this.month}-01`}
        onDayPress={day => {
          this.checkDate(day.dateString);
        }}
        onMonthChange={date => {
          this.handleChangedDate(date);
        }}
      />
    );
  }

  renderDiary(item) {
    const selectedPalette = this.rootStore.moodPaletteList[
      this.accountStore.currentPaletteID
    ];

    return (
      <View
        style={{
          padding: 25,
          margin: 30,
          height: 350,
          borderWidth: 1,
          borderColor: 'gray'
        }}
      >
        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
          <View
            style={{
              backgroundColor: selectedPalette.moodColors[item.item.mood],
              height: 60,
              width: 60
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
              <TouchableOpacity onPress={this.closeDialog}>
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
    const moodColors = this.rootStore.moodPaletteList[
      this.accountStore.currentPaletteID
    ].moodColors;
    const { high, happy, neutral, unhappy, bad } = moodColors;

    return (
      <View style={styles.container}>
        {this.state.isCalendarMode ? (
          this.renderCalendar()
        ) : (
            <FlatList
              style={{ paddingTop: 10, width: '100%', height: '90%' }}
              data={_.filter(dataSource, record => this.filterRecords(record))}
              keyExtractor={item => item.id}
              renderItem={item => this.renderDiary(item)}
              ListEmptyComponent={<EmptyComponent />}
            />
          )}
        {this.state.isDialogVisible ? this.renderDialog(this.date) : null}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              this.setState({ isCalendarMode: !this.state.isCalendarMode })
            }
          >
            {this.state.isCalendarMode ?
              DiaryModeIcon(high, happy, neutral)
              : CalendarModeIcon(high, happy, neutral, unhappy, bad)
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.Yearly({ year: this.year })}>
            {YearlyPaletteIcon()}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.ColourPalette()}>
            {ChangePaletteIcon()}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
  alertView: {
    justifyContent: 'space-around',
    backgroundColor: '#f4f4f4',
    height: 300,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7
  },
  iconContainer: {
    width: '100%',
    height: '12%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute', 
    bottom: -10,
    backgroundColor: 'white',
    paddingTop: 8
  },
  emptyRecordMessage: {
    flex: 1,
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modeChangeIconStyle: {
    width: 50,
    height: 50,
    borderWidth: 1
  },
  smallDiaryIcon: {
    width: 12,
    height: 12,
    margin: 6,
    borderWidth: 1
  },
  paletteIcon: {
    width: 50,
    height: 50,
    borderWidth: 1,
    justifyContent: 'space-between'
  },
  smallPaletteIcon: {
    height: '15%',
    flexDirection: 'row',
    margin: 4
  }, 
  yearlyIcon: {
    textAlign: 'center',
    paddingBottom: 9,
    fontSize: 15,
    fontWeight: '600'
  }
});

// stateless components

const EmptyComponent = () => (
  <View style={styles.emptyRecordMessage}>
    <Text>There's no record to show for this month!</Text>
  </View>
);

// diaryMode Icon
const DiaryModeIcon = (high, happy, neutral) => (
  <View style={styles.modeChangeIconStyle}>
    {SmallDiaryModeIcon(high, happy)}
    {SmallDiaryModeIcon(neutral, high)}
  </View>
);
const SmallDiaryModeIcon = (color1, color2) => (
  <View style={{ flexDirection: 'row' }}>
    <View style={styles.smallDiaryIcon}>
      <View style={{ flex: 4, backgroundColor: color1 }} />
      <View style={{ flex: 1, backgroundColor: 'white' }} />
    </View>
    <View style={styles.smallDiaryIcon}>
      <View style={{ flex: 4, backgroundColor: color2 }} />
      <View style={{ flex: 1, backgroundColor: 'white' }} />
    </View>
  </View>
);

// calendarMode Icon
const CalendarModeIcon = (high, happy, neutral, unhappy, bad) =>
  <View style={styles.modeChangeIconStyle}>
    {SmallCalendarIcon(high, happy, neutral)}
    {SmallCalendarIcon(happy, unhappy, neutral)}
    {SmallCalendarIcon(bad, high, unhappy)}
    {SmallCalendarIcon(bad, happy, neutral)}
  </View>;

const SmallCalendarIcon = (high, happy, neutral) =>
  <View style={{ padding: 3, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
    <View style={{ width: 6, height: 6, backgroundColor: `${high}` }} />
    <View style={{ width: 6, height: 6, backgroundColor: `${happy}` }} />
    <View style={{ width: 6, height: 6, backgroundColor: `${neutral}` }} />
    <View style={{ width: 6, height: 6, backgroundColor: `${high}` }} />
  </View>;

// moodPalette Icon
const ChangePaletteIcon = () => (
  <View style={styles.paletteIcon}>
    {SmallPaletteIcon('#990022')}
    {SmallPaletteIcon('#555500')}
    {SmallPaletteIcon('#004488')}
  </View>
);

const SmallPaletteIcon = color => (
  <View style={styles.smallPaletteIcon}>
    <View style={{ flex: 1, backgroundColor: `${color}99` }} />
    <View style={{ flex: 1, backgroundColor: `${color}80` }} />
    <View style={{ flex: 1, backgroundColor: `${color}60` }} />
    <View style={{ flex: 1, backgroundColor: `${color}40` }} />
    <View style={{ flex: 1, backgroundColor: `${color}22` }} />
  </View>
);

const YearlyPaletteIcon = () => (
  <View style={styles.paletteIcon}>
  <View style={{ backgroundColor: '#990022', height: 12 }} />
  <Text style={styles.yearlyIcon}>Year</Text>
  </View>
);
