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
    this.year = this.diaryStore.currentYear;
  }

  componentWillMount() {
    this.diaryStore.createMonthlyData();
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

    if (item.moods !== '') {
      return (
        <TouchableOpacity
          key={item.key}

          style={styles.monthSquare}
          onPress={() => {
            Actions.main({
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
          Actions.main({
            year: this.diaryStore.currentYear,
            month: item.month
          });
        }}
      >
        <View style={styles.emptyPalette} />
        <Text style={styles.textStyle}>{this.getMonth(item.month)}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const selectedPalette = this.rootStore.moodPaletteList[
      this.accountStore.currentPaletteID
    ];
    
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
  monthSquare: {
    flex: 1,
    width: 92,
    height: 110,
    margin: 15,
    borderWidth: 1,
    borderColor: '#95a8c6',
    backgroundColor: '#ffffff'
  },
  colorStyle: {
    flexDirection: 'row',
    height: 80,
    borderBottomWidth: 1,
    borderColor: '#95a8c6',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3c3642',
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3
  },
  colourPalette: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    margin: 11,
  },
  emptyPalette: {
    flex: 1, 
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#95a8c6'
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
