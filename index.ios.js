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
import Replace from './app/views/Replace'
// import RefreshListView from './app/views/RefreshListView'
import _ from 'lodash'

const {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  Platform,
  TabBarIOS,
  TouchableHighlight,
} = React;

class RNNavigatorDemo extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      selectedTab: 'sample',
      notifCount: 2,
    };
  }


  /**
   * 初始化的时候就会调用, 像这个tabbar 就有两个 <Navigator />
   * @param view
   * @returns {XML}
   * @private
   */
  _renderNavigatorView(view){
    let currentView = view || this.state.selectedTab;
    let navigatorRef = currentView  + 'Ref';
    console.log('refs==',this.refs);
    return (
      <Navigator
        // ref={this._setNavigatorRef.bind(this)}
        ref={navigatorRef}
        initialRoute={{view: currentView}}
        renderScene={this._renderScene.bind(this)}
        configureScene={this._configureScene.bind(this)}
      />
    )
  }

  _setNavigatorRef(navigator){
    console.log('navigator', navigator);
  }

  /**
   * 这里是需要渲染的时候到才会调用
   * @param route
   * @param navigator
   * @returns {XML}
   * @private
   */
  _renderScene(route, navigator){
    // debugger;
    console.log('route ==',route);
    console.log('navigator ==',navigator.getCurrentRoutes());

    // avoid the route call twice
    // const lastRoute =  _.last(navigator.getCurrentRoutes());
    // if(lastRoute.__navigatorRouteID !== route.__navigatorRouteID){
    //   return;
    // }

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
      case 'replace':
        return <Replace navigator={navigator} />
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
    // return(
    //   <RefreshListView ></RefreshListView>
    // )

    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="#1565C0">
        <TabBarIOS.Item
          title="List"
          systemIcon="search"
          selected={this.state.selectedTab === 'sample'}
          onPress={() => {
            this.setState({
              selectedTab: 'sample',
            });
          }}>
          {this._renderNavigatorView('sample')}
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
