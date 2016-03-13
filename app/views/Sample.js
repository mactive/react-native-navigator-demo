/**
 * mactive@gmail.com
 * 2016-03-09
 */

'use strict';
import React from 'react-native'
import NavBar from '../components/NavBar'

const {
  TouchableOpacity,
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


class Sample extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  _backPress(event) {
    this.props.navigator.pop()
  }

  _onPush(event){
    this.props.navigator.push({view:'sample'});
  }

  _onPresent(event){
    this.props.navigator.push({view:'sample', modalType:'present'});
  }

  _onReplace(event){
    this.props.navigator.replace({view:'replace'});
  }
  
  render(){
    return(
      <View style={styles.container}>
        <NavBar info={{title:'Sample', back: {onPress:this._backPress.bind(this)}}}></NavBar>
        <Text style={styles.title}>
          navigator route depth:
          {this.props.navigator.getCurrentRoutes().length}
        </Text>

        <TouchableOpacity style={styles.button} onPress={this._onPush.bind(this)}>
          <Text style={styles.buttonText}>Push</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button}  onPress={this._onPresent.bind(this)}>
          <Text style={styles.buttonText}>Present</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}  onPress={this._onReplace.bind(this)}>
          <Text style={styles.buttonText}>Replace ReplaceView</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#E3F2FD',
  },
  title:{
    fontSize: 20,
    height:80,
    width: width-40,
    textAlign: 'center',
    margin: 20,
  },
  button:{
    width: width-40,
    height: 40,
    margin: 20,
    backgroundColor: '#42A5F5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{

  }
})

module.exports = Sample;
