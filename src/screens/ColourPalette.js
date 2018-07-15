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
    return (
      <View style={styles.container}>
        {/* <Text>ColourPalette page!!</Text> */}
        <MoodPalette selectedPaletteID={this.props.selectedPaletteID} />
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
  }
});
