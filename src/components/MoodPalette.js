import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';

@inject('rootStore')
@observer
export default class MoodPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // moodImageURL: null,
      moodColours: {
        high: '#EC7417',
        happy: '#805118',
        neutral: '#E5D992',
        unhappy: '#CF7B84',
        bad: '#512D5E'
      },
      name: null,
      loading: true
    };
    this.rootStore = this.props.rootStore;
  }

  // componentWillMount() {
  //   this.setState({
  //     moodColours: {
  //       high: '#EC7417',
  //       happy: '#805118',
  //       neutral: '#805118',
  //       unhappy: '#CF7B84',
  //       bad: '#512D5E'
  //     }
  //   });
  // }

  // componentDidMount() {
  //   this.setState({
  //     moodImageURL: this.rootStore.moodImageURL
  //   });
  // }

  renderMoodImage() {
    // if (moodImageURL) {
    console.log('this is called!');
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={{
              uri: this.rootStore.defaultMoodPaletteImage
              // uri: moodImageURL || this.rootStore.defaultMoodPaletteImage
            }}
            style={styles.moodPaletteImage}
          />
          <View style={styles.colourPalette}>
            <View
              // style={styles.colourSquare}
              style={{
                backgroundColor: this.state.moodColours.high,
                flex: 1,
                height: 60,
                width: 60
              }}
            />
            <View
              // style={styles.colourSquare}
              style={{
                backgroundColor: this.state.moodColours.happy,
                flex: 1,
                height: 60,
                width: 60
              }}
            />
            <View
              // style={styles.colourSquare}
              style={{
                backgroundColor: this.state.moodColours.neutral,
                flex: 1,
                height: 60,
                width: 60
              }}
            />
            <View
              // style={styles.colourSquare}
              style={{
                backgroundColor: this.state.moodColours.unhappy,
                flex: 1,
                height: 60,
                width: 60
              }}
            />
            <View
              // style={styles.colourSquare}
              style={{
                backgroundColor: this.state.moodColours.bad,
                flex: 1,
                height: 60,
                width: 60
              }}
            />
          </View>
          <Text style={styles.paletteName}>UNICORN</Text>
        </View>
      </View>
    );
  }

  render() {
    console.log('mood palette is called!');
    console.log(this.state.moodColours.bad);

    return <View>{this.renderMoodImage()}</View>;
  }
}

const styles = StyleSheet.create({
  moodPaletteImage: {
    height: 200,
    width: 300,
    alignItems: 'center'
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
    height: 60
  }
});
