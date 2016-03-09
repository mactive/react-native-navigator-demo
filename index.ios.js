/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React from 'react-native'
import Profile from './app/views/Profile'
import RefreshList from './app/view/RefreshList'
import Login from './app/views/Login'

const {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  Platform,
  TabBarIOS,
  TouchableHighlight
} = React;

class RNNavigatorDemo extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      selectedTab: 'redTab',
      notifCount: 2
    };
  }

  _renderContent(_color: string, pageText: string){
    return (
      <View style={styles.container}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}> need to login to view more</Text>
        <TouchableHighlight style={[styles.button,{backgroundColor:_color}]} onPress={() => this.props.navigator.push({id: 'test'})}>
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="#1565C0">
        <TabBarIOS.Item
          title="List"
          systemIcon="search"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._renderContent('#2196F3', 'Blue Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="Profile"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('#F44336', 'Need login')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    margin: 20
  }
});

AppRegistry.registerComponent('RNNavigatorDemo', () => RNNavigatorDemo);
