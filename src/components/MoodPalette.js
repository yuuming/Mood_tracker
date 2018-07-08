import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions
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
    this.moodPaletteList = Object.values(this.rootStore.moodPaletteList);
  }

  componentWillMount() {
    console.log(this.moodPaletteList);
    this.setState({
      selectedPaletteName: this.moodPaletteList.name
    });
    console.log(this.state.selectedPaletteName);
  }

  // componentDidMount() {
  //   this.setState({
  //     moodImageURL: this.rootStore.moodImageURL
  //   });
  // }

  renderMoodImage = ({ item }) => {
    // if (moodImageURL) {
    console.log('renderMoodImage is called!');
    return (
      <View style={styles.cardItemContainer}>
        <View style={{ borderRadius: 8, borderColor: '#95a8c6' }}>
          <Image
            source={{
              // uri: this.rootStore.defaultMoodPaletteImage
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
      </View>
    );
  };

  render() {
    console.log('mood palette is called!');
    // console.log(this.state.moodColours.bad);

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

  // render() {
  //   console.log('mood palette is called!');
  //   console.log(this.state.moodColours.bad);

  //   return <View>{this.renderMoodImage()}</View>;
  // }
}

const styles = StyleSheet.create({
  moodPaletteImage: {
    height: height * 0.35,
    width: width * 0.9,
    alignItems: 'center',
    borderTopLeftRadius: 8
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
    color: '#95a8c6',
    fontSize: 20,
    fontWeight: '500',
    top: 10,
    paddingLeft: 17
  },
  cardItemContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 6,
    backgroundColor: 'white',
    borderRadius: 8
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
