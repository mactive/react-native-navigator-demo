/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React from 'react-native'
import Contacts from './app/views/Contacts'
import Search from './app/views/Search'
import Login from './app/views/Login'
import Sample from './app/views/Sample'

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
      selectedTab: 'search',
      notifCount: 2,
    };
  }

  _renderNavigatorView(view){
    let currentView = view || this.state.selectedTab
    let navigatorRef = currentView  + 'Ref'
    return (
      <Navigator
        ref={navigatorRef}
        initialRoute={{view: currentView}}
        renderScene={this._renderScene.bind(this)}
        configureScene={this._configureScene.bind(this)}
      />
    )
  }

  _renderScene(route, navigator){
    // debugger;
    switch (route.view){
      case 'search':
        return <Search navigator={navigator} />
      break;
      case 'contacts':
        return <Contacts navigator={navigator} />
      break;
      case 'sample':
        return <Sample navigator={navigator} />
      break;
    }
  }

  _configureScene(route, routeStack){
    if(route.modalType === 'present'){
      return Navigator.SceneConfigs.FloatFromBottom;
    }else{
      return Navigator.SceneConfigs.FloatFromRight;
    }
  }

  render() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="#1565C0">
        <TabBarIOS.Item
          title="List"
          systemIcon="search"
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search',
            });
          }}>
          {this._renderNavigatorView('search')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="contacts"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'contacts'}
          title='contacts'
          onPress={() => {
            this.setState({
              selectedTab: 'contacts',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderNavigatorView('contacts')}
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
