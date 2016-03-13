/**
 * mactive@gmail.com
 * 2016-03-09
 */

'use strict';
import React from 'react-native'

const {
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


class Contacts extends Component {
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
          Contacts View
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCDD2'
  },
  title:{
    fontSize: 20,
    height:80,
    width: width-40,
    textAlign: 'center'
  }
})

module.exports = Contacts;
