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

  renderYearlyMood(item) {
    console.log('renderYearlyMood');
    console.log(item);
    console.log(typeof item.item.moods.bad); // number
    // const badNum = item.item.moods.bad;
    // const happyNum = item.item.moods.happy;
    // const highNum = item.item.moods.high;
    // const neutralNum = item.item.moods.neutral;
    // const unhappyNum = item.item.moods.unhappy;
    // const moodsArray = { high: highNum, happy: happyNum, neutral: neutralNum, unhappy: unhappyNum, bad: badNum };
    const chosenMoodArrayNum = [];

    // const maxNumber = Math.max.apply(null, moodsArray);
    // console.log(maxNumber);

    // console.log(moodsArray[key]);
    for (let i = 0; i < item.item.moods.length; i++) {
      console.log(item.moods[i]);
      if (item.moods[i] !== 0) {
        chosenMoodArray.push(item.moods[i]);
      }
    }
    console.log(chosenMoodArrayNum);
    if (item.item.moods !== '') {
      return (
        <View style={styles.monthSquare}>
          <View
            key={item.item.month}
            style={{
              width: 100,
              height: 90,
              fontSize: 15,
              fontWeight: '100',
              color: '#3c3642'
            }}
          >
            <View
              style={{
                flex: item.item.moods.high,
                backgroundColor: this.selectedPalette.moodColors.high
              }}
            />
            <View
              style={{
                flex: item.item.moods.happy,
                backgroundColor: this.selectedPalette.moodColors.happy
              }}
            />
            <View
              style={{
                flex: item.item.moods.neutral,
                backgroundColor: this.selectedPalette.moodColors.neutral
              }}
            />
            <View
              style={{
                flex: item.item.moods.unhappy,
                backgroundColor: this.selectedPalette.moodColors.unhappy
              }}
            />
            <View
              style={{
                flex: item.item.moods.bad,
                backgroundColor: this.selectedPalette.moodColors.bad
              }}
            />
            {/* <Text>{item.item.month}</Text> */}
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '300',
              color: '#3c3642',
              paddingLeft: 5
            }}
          >
            {item.item.month}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.monthSquare}>
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <Text>{item.item.month}</Text>
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
          // data={this.dataSource}
          data={this.dataSourceNew}
          renderItem={item => this.renderYearlyMood(item)}
        />
      </View>
    );
  }
}

// const monthSquare = (color, month, mood) => (
//   <View
//     style={{
//       height: 120,
//       width: 90,
//       borderWidth: 1,
//       borderColor: '#95a8c6'
//     }}
//   >
//     <View style={{ backgroundColor: color, height: 70, width: 90 }} />

//     <Text
//       style={{
//         fontSize: 20,
//         fontWeight: '300',
//         color: '#3c3642',
//         paddingLeft: 5
//       }}
//     >
//       {month}
//     </Text>
//     <Text
//       style={{
//         fontSize: 15,
//         fontWeight: '100',
//         color: '#3c3642',
//         paddingLeft: 5
//       }}
//     >
//       {mood}
//     </Text>
//   </View>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  monthSquare: {
    flex: 1,
    width: 100,
    height: 120,
    fontSize: 15,
    margin: 12,
    borderWidth: 1,
    borderColor: '#95a8c6'
  }
});
