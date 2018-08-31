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
    this.accountStore = this.rootStore.accountStore;
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
    const arraySort = Object.values(this.accountStore.yearArray);
    arraySort.sort((a, b) => a < b ? 1 : -1);
    const dataArray = [arraySort];
    console.log('rendertitle is runing', this.rootStore.diaryStore.currentYear);
    console.log('dataArray', dataArray);

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
          this.setState({ text: dataArray[selection][row] });
          console.log(dataArray[selection][row]);
          this.changeCurrentYear(dataArray[selection][row]);
        }}
        data={dataArray}
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
