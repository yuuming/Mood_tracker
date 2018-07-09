import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { observer, inject } from 'mobx-react';

const { width, height } = Dimensions.get('window');

@inject('rootStore')
@observer
export default class MoodPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedPaletteName: null
    };
    this.rootStore = this.props.rootStore;
    this.accountStore = this.rootStore.accountStore;
    this.user = this.accountStore.user;
    this.selectedPaletteID = this.props.selectedPaletteID;
    this.currentPaletteID = this.user.currentPalette;
    this.moodPaletteList = Object.values(this.rootStore.moodPaletteList);
    this.moodPaletteListWithId = this.rootStore.moodPaletteList;
  }

  componentWillMount() {
    console.log(this.moodPaletteList);
    console.log(this.user);
    console.log('====moodPaletteListWithID====', this.moodPaletteListWithId);
    console.log('this.currentPaletteID', this.currentPaletteID);
  }

  renderMoodImage = ({ item }) => {
    console.log('renderMoodImage is called!');
    console.log('=====ITEM=====', item);
    console.log(this.rootStore.moodPaletteList[this.selectedPaletteID]);

    return (
      <TouchableOpacity
        onPress={() => this.chatStore.enterAnyChatRoom(item)}
        style={{
          marginHorizontal: 8,
          marginVertical: 6
        }}
      >
        <View
          style={
            this.rootStore.moodPaletteList[this.selectedPaletteID].name ===
            item.name
              ? styles.selectedItemContainer
              : styles.cardItemContainer
          }
        >
          <Image
            source={{
              uri: item.imgUrl || this.rootStore.defaultMoodPaletteImage
            }}
            style={styles.moodPaletteImage}
          />
          <View style={styles.colourPalette}>
            {colorSquare(item.moodColors.high)}
            {colorSquare(item.moodColors.happy)}
            {colorSquare(item.moodColors.neutral)}
            {colorSquare(item.moodColors.unhappy)}
            {colorSquare(item.moodColors.bad)}
          </View>
          <Text style={styles.paletteName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    console.log('mood palette is called!');
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.moodPaletteList}
          keyExtractor={item => item.id}
          renderItem={item => this.renderMoodImage(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  moodPaletteImage: {
    height: height * 0.35,
    width: width * 0.9,
    resizeMode: 'stretch'
    // alignItems: 'center'
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8
    // borderRadius: 10
  },
  colourSquare: {
    flex: 1,
    height: 60,
    width: 60
  },
  colourPalette: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60
  },
  paletteName: {
    flexDirection: 'row',
    height: 60,
    color: '#3c3642',
    fontSize: 20,
    fontWeight: '500',
    top: 10,
    paddingLeft: 17,
    paddingTop: 10
  },
  cardItemContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#95a8c6',
    borderWidth: 1
  },
  selectedItemContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#68dbf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#95a8c6'
  }
});

const colorSquare = color => (
  <View
    style={{
      backgroundColor: color,
      flex: 1,
      height: 60,
      width: 60
    }}
  />
);
