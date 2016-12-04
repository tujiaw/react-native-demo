import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class LikeCount extends Component {
  constructor(props) {
    super(props);
    this.state = {likes: 0};
  }

  onClick() {
    this.setState({likes: this.state.likes + 1});
  }

  render() {
    var thumbsUp = '\uD83D\uDC4D';
    return (
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={this.onClick.bind(this)} style={styles.likeButton}>
          <Text style={styles.likesText}>{'Star'}</Text>
        </TouchableOpacity>
        <Text style={styles.likesText}>{this.state.likes + '个喜欢数'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  likeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 0,
    padding: 0,
    height: 30,
  },
  likeContainer: {
    flexDirection: 'row',
    margin: 9,
    width: 220,
  },
  likesText: {
    flex: 1,
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 9,
  },
})