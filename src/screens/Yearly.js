import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import MoodPalette from '../components/MoodPalette';
import _ from 'lodash';

@inject('rootStore')
@observer
export default class Yearly extends Component {
  constructor(props) {
    super(props);
    this.rootStore = this.props.rootStore;
    this.accountStore = this.rootStore.accountStore;
    this.user = this.accountStore.user;
    this.markedDateArray = [];
  }

  componentWillMount() {
    console.log(this.user.markedDates);
    const markedDateArray = _.sortBy(this.user.markedDates, o => o.date);
    this.markedDateArray = markedDateArray;

    _.forEach(this.markedDateArray, markedDate => {
      console.log(markedDate.date);
      const year = markedDate.date.slice(0, 4);
      const month = markedDate.date.charAt(5) + markedDate.date.charAt(6);

      console.log(year);
      console.log(month);
    });
  }
  // renderYearlyMood = ({ item }) => (
  //   <TouchableOpacity
  //   key={item.id}
  //   onPress={() => {
  //     console.log('hahahahahahah');
  //   }}>
  //     <View style={styles.container}>
  //        <View style={styles.colourPalette}>
  //          {monthSquare('blue', 'May', 'Happy')}
  //        </View>
  //      </View>

  //   </TouchableOpacity>
  // );
  // }

  render() {
    return (
      <View>
        <Text>haha</Text>
        {/* <FlatList
          numColumns={3}
          keyExtractor={item => item.id}
          data={this.markedDateArray}
          renderItem={item => this.renderYearlyMood(item)}
        /> */}
      </View>
    );
  }

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.colourPalette}>
  //         {monthSquare('blue', 'May', 'Happy')}
  //       </View>
  //     </View>
  //   );
  // }
}

const monthSquare = (color, month, mood) => (
  <View
    style={{
      height: 120,
      width: 90,
      borderWidth: 1,
      borderColor: '#95a8c6'
    }}
  >
    <View style={{ backgroundColor: color, height: 70, width: 90 }} />

    <Text
      style={{
        fontSize: 20,
        fontWeight: '300',
        color: '#3c3642',
        paddingLeft: 5
      }}
    >
      {month}
    </Text>
    <Text
      style={{
        fontSize: 15,
        fontWeight: '100',
        color: '#3c3642',
        paddingLeft: 5
      }}
    >
      {mood}
    </Text>
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
