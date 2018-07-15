import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import MoodPalette from '../components/MoodPalette';

@inject('rootStore')
@observer
export default class Yearly extends Component {
  constructor(props) {
    super(props);
    this.rootStore = this.props.rootStore;
    this.accountStore = this.rootStore.accountStore;
  }

  componentWillMount() {
    console.log('colourpalette!!');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.colourPalette}>
          {monthSquare('blue', 'May', 'Happy')}
        </View>
      </View>
    );
  }
}

const monthSquare = (color, month, mood) => (
  <View
    style={{
      height: 110,
      width: 80,
      borderWidth: 1
    }}
  >
    <View style={{ backgroundColor: color, height: 70, width: 80 }} />

    <Text>{month}</Text>
    <Text>{mood}</Text>
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
