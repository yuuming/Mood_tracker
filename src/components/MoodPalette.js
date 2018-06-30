import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';

@inject('rootStore')
@observer
export default class MoodPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  render() {
    return <View />;
  }
}
