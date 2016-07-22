/**
 * mactive@gmail.com
 * 2016-03-09
 */

'use strict';
import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import {AppRegistry,  TouchableOpacity,
StyleSheet,
Text,
View,
Dimensions} from 'react-native';
import _ from 'lodash'

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
    // this.depth = _.cloneDeep(this.props.navigator.getCurrentRoutes().length);
    this.route = _.last(this.props.navigator.getCurrentRoutes());
    this.depth =  this.props.navigator.getCurrentRoutes().length;
  }

  /** == life cycle start == **/

  componentWillReceiveProps(nextProps) {
    console.log('#_WillReceiveProps',this.route,nextProps);
  }

  componentWillMount() {
    console.log('#_WillMount',this.route);
  }


  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('#_ShouldUpdate',this.route,nextProps,nextState);
  //   return nextProps.id !== this.props.id;
  // }



  componentWillUpdate(prevProps,prevState) {
    console.log('#_WillUpdate',this.route,this.props.navigator.getCurrentRoutes(),prevProps,prevState);
  }

  componentDidUpdate(prevProps,prevState) {
    console.log('#_DidUpdate',this.route,prevProps,prevState);
  }

  componentDidMount() {
    console.log('#_DidMount',this.route);
  }

  componentWillUnmount(){
    console.log('#_WillUnmount', this.route, this.props.navigator.getCurrentRoutes());
  }

  /** == life cycle end == **/





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

<<<<<<< HEAD
=======

  _onReplaceParent(event){
    this.props.navigator.replacePrevious({view:'replace'});
  }

  _onReplaceAtIndex(index){
    console.log('#_onReplaceAtIndex',index);
    this.props.navigator.replaceAtIndex({view:'replace'},index);
  }
  
>>>>>>> 4e46fa932dc7980fc75def0b4ad6392453197683
  render(){
    console.log('#_Render', this.route);
    const grandIndex = this.depth -2 -1;
    return(
      <View style={styles.container}>
        <NavBar info={{title:'Sample', back: {onPress:this._backPress.bind(this)}}}></NavBar>

        <Text style={styles.title}>
          navigator route ID:
          {this.route.__navigatorRouteID}
        </Text>

        <Text style={styles.title}>
          navigator route depth:
          {this.depth}
        </Text>

        <TouchableOpacity style={styles.button} onPress={this._onPush.bind(this)}>
          <Text style={styles.buttonText}>Push</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button}  onPress={this._onPresent.bind(this)}>
          <Text style={styles.buttonText}>Present</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button}  onPress={this._onReplaceParent.bind(this)}>
          <Text style={styles.buttonText}>  Replace ParentView</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}  onPress={this._onReplaceAtIndex.bind(this,grandIndex)}>
          <Text style={styles.buttonText}>  Replace GrandParentView</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button}  onPress={this._onReplace.bind(this)}>
          <Text style={styles.buttonText}>Replace CurrentView</Text>
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
    height:30,
    width: width-40,
    textAlign: 'center',
    margin: 15,
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
