import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Platform,
  StyleSheet
} from 'react-native'

// import Icon from 'react-native-vector-icons/MaterialIcons'

const NAV_BAR_HEIGHT = 44
const STATUS_BAR_HEIGHT = 20

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBarContainer: {
    backgroundColor: '#2196F3',
    paddingBottom: 5,
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT
  },
  statusTitle: {
    position: 'absolute',
    fontSize: 16,
    left: 0,
    right: 0,
    bottom: 7,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0
  },
  backButton: {
    marginLeft: 8,
    marginTop: 14,
  },
  forwardButton: {
    right: 5
  },
  buttonIcon: {
    color: '#fff',
  },
  backButtonIcon: {
    marginTop: 0
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  backButtonText: {
    paddingBottom: 0,
    paddingTop: 8,
    paddingRight: 15,
  },
  forwardButtonText: {
    fontSize: 14,
    paddingTop: 21,
    paddingRight: 15,
  },
  hideNav: {
    opacity: 0,
    height: 0,
    backgroundColor: '#00bafe'
  }
})

class NavBar extends Component {
  constructor(props) {
    super(props)
    //console.log(this.props);
  }

  getNavBarBackButton() {
    if (this.props.info.back) {
      let backButtonInfo = this.props.info.back
      return (
        <TouchableOpacity onPress={backButtonInfo.onPress} style={[styles.button, styles.backButton]}>
          <Text style={[styles.buttonText, styles.backButtonText]}> &lt;  </Text>
          <Text style={[styles.buttonText, styles.backButtonText]}>{backButtonInfo.text}</Text>
        </TouchableOpacity>
      )
    } else {
      return (<View></View>)
    }
  }

  getNavBarForwardButton() {
    if (this.props.info.forward) {
      let forwardButtonInfo = this.props.info.forward
      return (
        <TouchableOpacity onPress={forwardButtonInfo.onPress} style={[styles.button, styles.forwardButton]}>
          <Text style={[styles.buttonText, styles.forwardButtonText]}>{forwardButtonInfo.text}</Text>
        </TouchableOpacity>
      )
    } else {
      return (<View></View>)
    }
  }


  getNavBarLogoutButton() {
    if (this.props.info.logout) {
      return (
        <TouchableOpacity onPress={this._logout.bind(this)} style={[styles.button, styles.forwardButton]}>
          <Text style={[styles.buttonText, styles.forwardButtonText]}>logout</Text>
        </TouchableOpacity>
      )
    } else {
      return (<View></View>)
    }
  }

  _logout(){
    const self = this;
    // 调用logout接口
    Networking.logout()
      .then((res)=>{
        // 删除用户
        //console.log(res);
        // DEBUG 这里的 navigator 是从来的Pilot来的
        self.props.navigator.replace({view:'Login'})
      })
  }

  render() {
    //console.log('hideNav', this.props.hideNav)
    if (Platform.OS === 'ios') {
      return (
        <View style={[styles.navBarContainer,this.props.hideNav && styles.hideNav]}>
          <View style={styles.statusBar}/>
          <View style={styles.navBar}>
            <Text style={styles.statusTitle}>
              {this.props.info.title}
            </Text>
            {this.getNavBarBackButton()}
            {this.getNavBarForwardButton()}
            {this.getNavBarLogoutButton()}
          </View>
        </View>
      )
    }else {
      return (
        <View style={[styles.navBarContainer,this.props.hideNav && styles.hideNav]}>
          <View style={styles.navBar}>
            <Text style={styles.statusTitle}>
              {this.props.info.title}
            </Text>
            {this.getNavBarBackButton()}
            {this.getNavBarForwardButton()}
            {this.getNavBarLogoutButton()}
          </View>
        </View>
      )
    }
  }
}

module.exports = NavBar
