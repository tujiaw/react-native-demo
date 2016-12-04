import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  _handlePress() {
    if (this.props.enabled && this.props.onPress) {
      this.props.onPress();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._handlePress.bind(this)}>
        <View style={[styles.button, this.props.enabled ? {} : styles.buttonDisabled]}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  buttonDisabled: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  }
})