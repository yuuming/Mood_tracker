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
import DropdownMenu from 'react-native-dropdown-menu';

@inject('rootStore')
@observer
export default class YearlyBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.rootStore = this.props.rootStore;
    this.diaryStore = this.rootStore.diaryStore;
    this.currentYear = this.diaryStore.currentYear;
  }

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
  changeCurrentYear = year => {
    this.rootStore.diaryStore.currentYear = year;
    console.log(
      'changeCurrentYear is running!!!!!!!!!!!',
      this.rootStore.diaryStore.currentYear
    );
  
    this.diaryStore.createMonthlyData();
    Actions.Yearly();
  };

  renderTitle() {
    const data = [['2018', '2017']];
    console.log('rendertitle is runing', this.rootStore.diaryStore.currentYear);

    return (
      <DropdownMenu
        style={{ flex: 1 }}
        bgColor={'white'}
        tintColor={'#666666'}
        activityTintColor={'green'}
        // arrowImg={}
        // checkImage={}
        // optionTextStyle={{color: '#333333'}}
        // titleStyle={{color: '#333333'}}
        // maxHeight={300}
        handler={(selection, row) => {
          this.setState({ text: data[selection][row] });
          this.changeCurrentYear(data[selection][row]);
        }}
        data={data}
      />
      // <View style={styles.title}>
      //   <TouchableOpacity
      //     onPress={() => console.log('test')}
      //     style={{ paddingRight: 10 }}
      //   >
      //     <Text style={{ fontSize: 20, fontWeight: '800' }}>{this.currentYear}</Text>
      //   </TouchableOpacity>
      // </View>
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
