import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { observer, inject } from 'mobx-react';

@inject('rootStore')
@observer
export default class ColourPaletteBar extends Component {
  backButton() {
    console.log('==============palette');
    return (
      <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 8 }}>
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
      <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.rootStore.updateSelectPalette();
          }}
          style={{ paddingRight: 10 }}
        >
          <View>
            <Text
              style={{
                paddingRight: 14,
                minWidth: 32,
                minHeight: 32,
                fontSize: 18,
                colour: '#7F8C8D'
              }}
            >
              Done
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    console.log('==============paletteBARRRR');
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
    height: 64,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  navBarItem: {}
});
