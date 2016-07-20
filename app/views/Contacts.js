/**
 * mactive@gmail.com
 * 2016-03-09
 */

'use strict';
import React from 'react-native'
import RNActionView from '../components/RNActionView'

const {
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
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

  onAction(){
    RNActionView.showActionView((response)=>{
      console.log(response);
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>
          Contacts View
        </Text>

        <TouchableOpacity  onPress={this.onAction.bind(this)}>
          <Text style={styles.title}>ActionView</Text>
        </TouchableOpacity>
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
