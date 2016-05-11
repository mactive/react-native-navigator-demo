/**
 * mactive@gmail.com
 * 2016-03-09
 */

'use strict';
import React from 'react-native'
import NavBar from '../components/NavBar'
import _ from 'lodash'

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


class Replace extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
    this.route = this.props.route;
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

  _onReplace(event){
    this.props.navigator.replace({view:'replace'});
  }

  render(){
    console.log('#_Render', this.route);

    return(
      <View style={styles.container}>
        <NavBar info={{title:'Replace', back: {onPress:this._backPress.bind(this)}}}></NavBar>
        <Text style={styles.title}>
          navigator route ID:
          {this.route.__navigatorRouteID}
        </Text>

        <Text style={styles.title}>
          navigator route depth:
          {this.props.navigator.getCurrentRoutes().length}
        </Text>

        <TouchableOpacity style={styles.button} onPress={this._onPush.bind(this)}>
          <Text style={styles.buttonText}>Push SampleView</Text>
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
    height:30,
    width: width-40,
    textAlign: 'center',
    margin: 15,
  },
  button:{
    width: width-40,
    height: 40,
    margin: 20,
    backgroundColor: '#4DB6AC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{

  }
})

module.exports = Replace;
