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
    this.markedDateArray = [];
    this.year = this.props.year;
    this.dataSource = [];
    this.dataSourceNew = [];
  }

  componentWillMount() {
    console.log(this.diaryStore.moodCounter);

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
    const bad = item.item.moods.bad;
    const happy = item.item.moods.happy;
    const high = item.item.moods.high;
    const neutral = item.item.moods.neutral;
    const unhappy = item.item.moods.unhappy;
    const moodsArray = [bad, happy, high, neutral, unhappy];
    for (let i = 0; i < moodsArray.length; i++) {
      if (moodsArray[i].toString() === '0') {
      }
    }

    return (
      <View
        key={item.item.month}
        style={{
          fontSize: 15,
          fontWeight: '100',
          color: '#3c3642',
          paddingLeft: 5
        }}
      >
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

const monthSquare = (color, month, mood) => (
  <View
    style={{
      height: 120,
      width: 90,
      borderWidth: 1,
      borderColor: '#95a8c6'
    }}
  >
    <View style={{ backgroundColor: color, height: 70, width: 90 }} />

    <Text
      style={{
        fontSize: 20,
        fontWeight: '300',
        color: '#3c3642',
        paddingLeft: 5
      }}
    >
      {month}
    </Text>
    <Text
      style={{
        fontSize: 15,
        fontWeight: '100',
        color: '#3c3642',
        paddingLeft: 5
      }}
    >
      {mood}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
});
