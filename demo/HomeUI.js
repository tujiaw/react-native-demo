import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class HomeUI extends Component {
  goBack() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.goBack.bind(this)}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get statted,edit index
        </Text>
      </View>
    )
  }
}