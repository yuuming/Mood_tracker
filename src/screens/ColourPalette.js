import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import MoodPalette from '../components/MoodPalette';

@inject('rootStore')
@observer
export default class ColourPalette extends Component {
  constructor(props) {
    super(props);
    this.rootStore = this.props.rootStore;
    this.accountStore = this.rootStore.accountStore;
  }

  componentWillMount() {
    console.log('colourpalette!!');
  }

  render() {
    const selectedPalette = this.rootStore.moodPaletteList[
      this.accountStore.currentPaletteID
    ];
    return (
      <View style={styles.container}>
        <View style={styles.colourPalette}>
          {paletteStyle(selectedPalette.moodColors.high, 'high')}
          {paletteStyle(selectedPalette.moodColors.happy, 'happy')}
          {paletteStyle(selectedPalette.moodColors.neutral, 'neutral')}
          {paletteStyle(selectedPalette.moodColors.unhappy, 'unhappy')}
          {paletteStyle(selectedPalette.moodColors.bad, 'bad')}
        </View>
        <View style={{ flex: 1 }}>
          <MoodPalette />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  colourPalette: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    margin: 11,
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
