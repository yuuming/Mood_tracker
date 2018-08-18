import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import MoodPalette from '../components/MoodPalette';
import _ from 'lodash';
import { toJS } from '../../node_modules/mobx';

@inject('rootStore')
@observer
export default class Yearly extends Component {
  constructor(props) {
    super(props);
    this.rootStore = this.props.rootStore;
    this.diaryStore = this.rootStore.diaryStore;
    this.accountStore = this.rootStore.accountStore;
    this.user = this.accountStore.user;
    this.selectedPalette = this.rootStore.moodPaletteList[
      this.accountStore.currentPaletteID
    ];
    this.markedDateArray = [];
    this.year = this.props.year;
    this.dataSource = [];
    this.dataSourceNew = [];
  }

  componentWillMount() {
    console.log(this.diaryStore.moodCounter);
    console.log('===yearly palette =====', this.selectedPalette);

    // create an obj for datasource
    // _.forEach(this.diaryStore.moodCounter[this.year], (element, key) => {
    //   console.log(key);
    //   const obj = {
    //     month: key,
    //     moods: element.moods
    //   };
    //   console.log(obj);
    //   this.dataSource.push(obj);
    // });

    let stringMonth;
    // const zero = '0';
    for (i = 1; i <= 12; i++) {
      if (i.toString().length === 1) {
        stringMonth = `0${i.toString()}`;
      } else {
        stringMonth = i;
      }
      const obj1 = {
        month: stringMonth,
        moods: ''
      };
      console.log(obj1);
      this.dataSourceNew.push(obj1);
    }
    console.log(this.dataSourceNew);
    _.forEach(this.diaryStore.moodCounter[this.year], (element, key) => {
      console.log(key);
      const obj = {
        month: key,
        moods: element.moods
      };
      console.log(obj);
      this.dataSource.push(obj);
    });

    for (let i = 0; i < this.dataSourceNew.length; i++) {
      console.log(this.dataSourceNew[i]);
      for (let j = 0; j < this.dataSource.length; j++) {
        console.log(this.dataSourceNew[i].month);
        console.log(this.dataSource[j].month);
        if (this.dataSourceNew[i].month === this.dataSource[j].month) {
          this.dataSourceNew[i] = this.dataSource[j];
        }
      }
    }
  }

  getMonth = (monthNum) => {
    //shortMonth is immutable here, therefore better to define it const!
    const shortMonth = monthNum.toString();

    switch (shortMonth) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
      default:
        return '00';
    }
  };

  renderYearlyMood(item) {
    console.log('renderYearlyMood');
    console.log(item);
    console.log(typeof item.item.moods.bad); // number
    const { high, happy, neutral, unhappy, bad } = this.selectedPalette.moodColors;

    if (item.item.moods !== '') {
      return (
        <View style={styles.monthSquare} key={item.item.month}>
          <View style={styles.colorStyle}>
            {colorRange(item.item.moods.high, high)}
            {colorRange(item.item.moods.happy, happy)}
            {colorRange(item.item.moods.neutral, neutral)}
            {colorRange(item.item.moods.unhappy, unhappy)}
            {colorRange(item.item.moods.bad, bad)}
          </View>
          <Text style={styles.textStyle}>{this.getMonth(item.item.month)}</Text>
        </View>
      );
    }
    return (
      //I commented out those redundant Views here to improve readability!
      //View with flex value always makes itself flexible, so one View will occupy all the given available space
      <View style={styles.monthSquare}>
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        {/* <View style={{ flex: 1, backgroundColor: 'white' }} />
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <View style={{ flex: 1, backgroundColor: 'white' }} /> */}
        <Text style={styles.textStyle}>{this.getMonth(item.item.month)}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          numColumns={3}
          keyExtractor={index => index}
          data={this.dataSourceNew}
          renderItem={item => this.renderYearlyMood(item)}
        />
        <View style={styles.colourPalette}>
          {paletteStyle(this.selectedPalette.moodColors.high)}
          {paletteStyle(this.selectedPalette.moodColors.happy)}
          {paletteStyle(this.selectedPalette.moodColors.neutral)}
          {paletteStyle(this.selectedPalette.moodColors.unhappy)}
          {paletteStyle(this.selectedPalette.moodColors.bad)}
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
    backgroundColor: '#ffffff'
  },
  monthSquare: {
    flex: 1,
    width: 92,
    height: 110,
    // fontSize is applicable to Text only
    // fontSize: 15,
    margin: 15,
    borderWidth: 1,
    borderColor: '#95a8c6'
  },
  colorStyle: {
    flexDirection: 'row',
    // this is to remove a white space 
    // justifyContent: 'flex-start',
    // width: 92,
    height: 80,
    //fontWeight is applicable only to Text 
    // fontWeight: '100',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#3c3642',
    paddingLeft: 5,
    //I just tried this way to make things work as they're supposed to
    paddingTop: 3,
    paddingBottom: 3
  },
  colourPalette: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
    margin: 11
  }
});

const paletteStyle = color => (
  <View
    style={{
      backgroundColor: color,
      flex: 1,
      height: 30,
      width: 60
    }}
  />
);
const colorRange = (rangeNum, color) => (
  <View
    style={{
      flex: rangeNum,
      backgroundColor: color,
    }}
  />
);
