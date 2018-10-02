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
export default class ColourPaletteBar extends Component {
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

  doneButton() {
    return (
      <View style={styles.doneButton}>
        <TouchableOpacity
          onPress={() => {
            this.props.rootStore.updateSelectPalette()
              .then(() => {
                Actions.pop();
              })
              .catch((err) => {
                console.log(err);
                alert('Please try it again!');
              });
          }}
          style={{ paddingRight: 10 }}
        >
          <View>
            <Text style={styles.doneButtonFont}>Done</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.backButton()}
        {this.doneButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: 50,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  doneButtonFont: {
    paddingRight: 14,
    minWidth: 32,
    minHeight: 32,
    fontSize: 20
  },
  doneButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backButton: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 8
  }
});
