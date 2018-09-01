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
    // this.selectedPalette = this.rootStore.moodPaletteList[
    //   this.accountStore.currentPaletteID
    // ];
    this.markedDateArray = [];
    this.year = this.diaryStore.currentYear;
    // this.dataSource = [];
    // this.dataSourceNew = [];

    // this.state = {
    //   year: this.diaryStore.currentYear
    // };
  }

  componentWillMount() {
    console.log(this.diaryStore.moodCounter);
    console.log('&&&&&&&&&&&', this.year);
    this.diaryStore.createMonthlyData();

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

    // let stringMonth;
    // for (i = 1; i <= 12; i++) {
    //   if (i.toString().length === 1) {
    //     stringMonth = `0${i.toString()}`;
    //   } else {
    //     stringMonth = i;
    //   }
    //   const obj1 = {
    //     month: stringMonth,
    //     moods: ''
    //   };
    //   console.log(obj1);
    //   this.dataSourceNew.push(obj1);
    // }
    // console.log(this.dataSourceNew);
    // _.forEach(this.diaryStore.moodCounter[this.year], (element, key) => {
    //   console.log(key);
    //   const obj = {
    //     month: key,
    //     moods: element.moods
    //   };
    //   console.log(obj);
    //   this.dataSource.push(obj);
    // });

    // for (let i = 0; i < this.dataSourceNew.length; i++) {
    //   console.log(this.dataSourceNew[i]);
    //   for (let j = 0; j < this.dataSource.length; j++) {
    //     console.log(this.dataSourceNew[i].month);
    //     console.log(this.dataSource[j].month);
    //     if (this.dataSourceNew[i].month === this.dataSource[j].month) {
    //       this.dataSourceNew[i] = this.dataSource[j];
    //     }
    //   }
    // }
  }

  getMonth = monthNum => {
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

  renderYearlyMood({ item }) {
    // this.diaryStore.createMonthlyData();
    // console.log('renderYearlyMood');
    // console.log(item.moods);
    //console.log(typeof item.moods.bad); // number
    const selectedPalette = this.rootStore.moodPaletteList[
      this.accountStore.currentPaletteID
    ];

    const {
      high,
      happy,
      neutral,
      unhappy,
      bad
    } = selectedPalette.moodColors;

    // if (this.diaryStore.currentYear === '2018') {
    //   console.log(this.diaryStore.currentYear);
    // }
    // console.log(item.moods);

    // console.log(item.key);

    if (item.moods !== '') {
      console.log('month!!!!!!!!!!!', item.month);
      return (
        <TouchableOpacity
          key={item.key}

          style={styles.monthSquare}
          onPress={() => {
            Actions.monthly({
              year: this.diaryStore.currentYear,
              month: item.month
            });
          }}
        >
          <View style={styles.colorStyle}>
            {colorRange(item.moods.high, high)}
            {colorRange(item.moods.happy, happy)}
            {colorRange(item.moods.neutral, neutral)}
            {colorRange(item.moods.unhappy, unhappy)}
            {colorRange(item.moods.bad, bad)}
          </View>
          <Text style={styles.textStyle}>{this.getMonth(item.month)}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        key={item.month}
        style={styles.monthSquare}
        onPress={() => {
          Actions.monthly({
            year: this.diaryStore.currentYear,
            month: item.month
          });
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <Text style={styles.textStyle}>{this.getMonth(item.month)}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    // console.log('Render yearly', this.diaryStore.currentYear);
    console.log('datasaurce', this.diaryStore.dataSourceNew);

    const selectedPalette = this.rootStore.moodPaletteList[
      this.accountStore.currentPaletteID
    ];
    
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          numColumns={3}
          keyExtractor={item => item.key}
          data={this.diaryStore.dataSourceNew}
          renderItem={item => this.renderYearlyMood(item)}
        />
        <View style={styles.colourPalette}>
          {paletteStyle(selectedPalette.moodColors.high, 'high')}
          {paletteStyle(selectedPalette.moodColors.happy, 'happy')}
          {paletteStyle(selectedPalette.moodColors.neutral, 'neutral')}
          {paletteStyle(selectedPalette.moodColors.unhappy, 'unhappy')}
          {paletteStyle(selectedPalette.moodColors.bad, 'bad')}
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
    margin: 15,
    borderWidth: 1,
    borderColor: '#95a8c6'
  },
  colorStyle: {
    flexDirection: 'row',
    height: 80
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#3c3642',
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3
  },
  colourPalette: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    margin: 11
  },
  paletteTextStyle: {
    fontSize: 14,
    fontWeight: '200',
    textAlign: 'center'
  }
});

const paletteStyle = (color, moodName) => (
  <View style={{ flex: 1 }}>
    <View
      style={{
        backgroundColor: color,
        height: 30
      }}
    />
    <Text style={styles.paletteTextStyle}>{moodName}</Text>
  </View>
);
const colorRange = (rangeNum, color) => (
  <View
    style={{
      flex: rangeNum,
      backgroundColor: color
    }}
  />
);
