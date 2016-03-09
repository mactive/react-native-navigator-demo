/**
 * mactive@gmail.com
 * 2016-03-09
 */

'use strict';
import React from 'react-native'

const {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions
} = React;

const {
  width,
  height
} = Dimensions.get('window')


class Profile extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>
          Profile View
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FF80AB'
  },
  title:{
    fontSize: 20,
    height:80,
    width: width/2,
    textAlign: 'center'
  }
})

module.exports = Profile;
