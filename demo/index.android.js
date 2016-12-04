/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ViewPagerAndroid,
  Navigator,
  View,
  Dimensions
} from 'react-native';

import LikeCount from './LikeCount.js';
import Button from './Button.js'
import HomeUI from './HomeUI.js'

const PAGES = 5;
const BGCOLOR = ['#fdc08e', '#fff6b9', '#99d1b7', '#dde5fe', '#f79273'];
const IMAGE_URIS = [
  'http://n1.itc.cn/img8/wb/smccloud/fetch/2015/05/07/168332205259791722.JPEG',
  'http://n1.itc.cn/img8/wb/smccloud/fetch/2015/05/07/122565911441543820.JPEG',
  'http://n1.itc.cn/img8/wb/smccloud/fetch/2015/05/07/180641312537237624.JPEG',
  'http://n1.itc.cn/img8/wb/smccloud/fetch/2015/05/07/75724922739863929.JPEG',
  'http://n1.itc.cn/img8/wb/smccloud/fetch/2015/05/07/138854591922680946.JPEG'
] 

class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var fractionalPos = (this.props.progress.position + this.props.progress.offset);
    var progressBarSize = (fractionalPos / (PAGES - 1)) * this.props.size;
    return (
      <View style={[styles.progressBarContainer, {width: this.props.size}]}>
        <View style={[styles.progressBar, {width: progressBarSize}]} />
      </View>
    )
  }
}

class MainScene extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{fontSize: 30, alignSelf: 'center'}}>{'hello, react native.'}</Text>
      </View>
    )
  }
}

class WelcomeUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      animationsAreEnabled: true,
      progress: {position: 0, offset: 0},
    }
  }

  move(delta) {
    let page = this.state.page + delta;
    this.go(page);
  }

  go(page) {
    if (this.state.animationsAreEnabled) {
      this.viewPager.setPage(page);
    } else {
      this.viewPager.setPageWithoutAnimation(page);
    }
    this.setState({page});
  }

  onClick() {
    this.props.navigator.push({name: 'main', component: MainScene, params: this.params});
  }

  onPageScroll(event) {
    this.setState({progress: event.nativeEvent});
  }

  onPageSelected(event) {
    this.setState({page: event.nativeEvent.position});
  }

  render() {
    let pages = [];
    for (let i = 0; i < PAGES; i++) {
      let pageStyle = {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BGCOLOR[i % BGCOLOR.length],
        alignItems: 'center',
        padding: 0,
      };
      if (i < PAGES - 1) {
        pages.push(
          <View key={i} style={pageStyle} collapsable={false}>
            <Image style={styles.image} source={{uri: IMAGE_URIS[i % BGCOLOR.length]}} />
            <LikeCount />
          </View>
        )
      } else {
        pages.push(
          <View key={i} style={pageStyle} collapsable={false} >
            <Image
              style={styles.image}
              source={{uri: IMAGE_URIS[i % BGCOLOR.length]}} 
            />
            <LikeCount />
            <TouchableOpacity onPress={this.onClick.bind(this)} style={styles.startupButton}>
              <Text style={styles.likesText}>{'启动首页'}</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }

    let {page, animationsAreEnabled} = this.state;
    return (
      <View style={styles.container}>
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={0}
          onPageScroll={this.onPageScroll.bind(this)}
          onPageSelected={this.onPageSelected.bind(this)}
          ref={viewPager => {this.viewPager = viewPager; }}>
          {pages}
        </ViewPagerAndroid>
        <View style={styles.buttons}>
          {
            animationsAreEnabled ?
            <Button
              text="Turn off animations"
              enabled={true}
              onPress={() => this.setState({animationsAreEnabled: false})} 
            />:
            <Button
              text="Turn animations back on"
              enabled={true}
              onPress={() => this.setState({animationsAreEnabled: true})} 
            />
          }
        </View>
        <View style={styles.buttons}>
          <Button text="Start" enabled={page > 0} onPress={() => this.go(0)} />
          <Button text="Prev" enabled={page > 0} onPress={() => this.move(-1)} />
          <Text style={styles.buttonText}>页：{page + 1} / {PAGES}</Text>
          <ProgressBar size={100} progress={this.state.progress} />
          <Button text="Next" enabled={page < PAGES - 1} onPress={() => this.move(1)} />
          <Button text="Last" enabled={page < PAGES - 1} onPress={() => this.go(PAGES - 1)} />
        </View>
      </View>
    )
  }
}

export default class demo extends Component {
  render() {
    let defaultName = 'Welcome UI';
    let defaultComponent = WelcomeUI;
    return (
      <Navigator
        initialRoute={{name: defaultName, component: defaultComponent}}
        configureScene={(route) => { return Navigator.SceneConfigs.FloatFromRight;}}
        renderScene={(route, nav) => {
          let Component = route.component;
          return <Component {...route.params} navigator={nav} />
        }}
      />
    );
  }
}

var styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
  buttonDisabled: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
  },
  scrollStateText: {
    color: '#99d1b7',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height - 160,
  },
  progressBarContainer: {
    height: 10,
    margin: 10,
    borderColor: '#eeeeee',
    borderWidth: 2,
  },
  progressBar: {
    alignSelf: 'flex-start',
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  viewPager: {
    flex: 1,
  },
});

AppRegistry.registerComponent('demo', () => demo);
