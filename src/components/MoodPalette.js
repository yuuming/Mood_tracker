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
        <View style={styles.colourSquare}>
        <Text>C1</Text>
        </View>
        <View style={styles.colourSquare}>
        <Text style={{ backgroundColor: '#8478b6' }}>C2</Text>
        </View>
        <View style={styles.colourSquare}>
        <Text>C3</Text>
        </View>
        <View style={styles.colourSquare}>
        <Text>C4</Text>
        </View>
        <View style={styles.colourSquare}>
        <Text>C5</Text>
        </View>
        </View>
        <Text style={styles.paletteName}>UNICORN</Text>
      </View>
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
    height: 60,
  },
  paletteName: {
    flexDirection: 'row',
    height: 60,
  }
});
