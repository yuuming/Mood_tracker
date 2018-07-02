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
      moodColours: {},
      name: null,
      loading: true
    };
    this.rootStore = this.props.rootStore;
  }

  // componentDidMount() {
  //   this.setState({
  //     moodImageURL: this.rootStore.moodImageURL
  //   });
  // }

  renderMoodImage() {
    // if (moodImageURL) {
    console.log('this is called!');
    return (
      <View>
        <Image
          source={{
            uri: this.rootStore.defaultMoodPaletteImage
            // uri: moodImageURL || this.rootStore.defaultMoodPaletteImage
          }}
          style={styles.moodPaletteImage}
        />
      </View>
    );
  }

  render() {
    console.log('mood palette is called!');
    return <View>{this.renderMoodImage()}</View>;
  }
}

const styles = StyleSheet.create({
  moodPaletteImage: {
    height: 150,
    width: 150,
    alignItems: 'center'
  }
});
