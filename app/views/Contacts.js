/**
 * mactive@gmail.com
 * 2016-03-09
 */

'use strict';
import React, { Component } from 'react';

import RNActionView from '../components/RNActionView'

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native'

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

  onActionB(){
    console.log('ddd');
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity  onPress={this.onActionB.bind(this)}>
        <Text style={styles.title}>
          Contacts View
        </Text>
        </TouchableOpacity>


        <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />

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
