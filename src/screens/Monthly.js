import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';

@inject('rootStore')
@observer
export default class Monthly extends Component {
  constructor(props) {
    super(props);
    this.rootStore = this.props.rootStore;
    this.accountStore = this.rootStore.accountStore;
  }

  componentWillMount() {
    console.log(this.accountStore.user);
    console.log(Actions.state);
    this.rootStore.loadMoodPaletteList();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Monthly page!</Text>
        <View>
          <TouchableOpacity onPress={() => Actions.colourPalette()}>
            <Text>go to colourPalette page!</Text>
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
    backgroundColor: '#F5FCFF'
  }
});
