import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { observer, inject } from 'mobx-react';

@inject('rootStore')
@observer
export default class AddPost extends Component {
    constructor(props) {
        super(props);

        this.rootStore = this.props.rootStore;
        this.accountStore = this.rootStore.accountStore;
        this.selectedPaletteID = this.props.selectedPaletteID;
    }

    componentWillMount() {
        console.log(this.props.post);
        console.log(this.props);
        console.log(this.rootStore.moodPaletteList[this.selectedPaletteID]);
    }

    renderColorPalette() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{ flexDirection: 'row' }}
                >
                    {colorSquare(this.props.post.selectedColor)}
                </View>
                <Text style={styles.textStyle}>{this.props.date}</Text>
                <Text style={styles.textStyle}>{this.props.post.comment}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    textStyle: {
        marginLeft: 30,
        marginTop: 20,
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 16
    },
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
