import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { observer, inject } from 'mobx-react';

@inject('rootStore')
@observer
export default class YearlyBar extends Component {
  backButton() {
    return (
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={{ paddingRight: 10 }}
        >
          <Icon name="keyboard-arrow-left" size={42} color="#7F8C8D" />
        </TouchableOpacity>
      </View>
    );
  }

  renderTitle() {
    return (
      <View style={styles.title}>
        <TouchableOpacity
          onPress={() => console.log('test')}
          style={{ paddingRight: 10 }}
        >
          <Text style={{ fontSize: 20, fontWeight: '800' }}>2018</Text>
        </TouchableOpacity>
      </View>
    );
  }


  render() {
    console.log('==============yearlyBar');
    return <View style={styles.container}>{this.renderTitle()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: 64,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backButton: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 8
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8
  }
});
