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
    this.route = _.last(this.props.navigator.getCurrentRoutes());
    this.depth =  this.route;
  }


  /** == life cycle start == **/

  componentWillReceiveProps(nextProps) {
    console.log('#_WillReceiveProps',this.depth,nextProps);
  }

  componentWillMount() {
    console.log('#_WillMount',this.depth);
  }


  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('#_ShouldUpdate',this.depth,nextProps,nextState);
  //   return nextProps.id !== this.props.id;
  // }


  componentWillUpdate(prevProps,prevState) {
    console.log('#_WillUpdate',this.depth,this.props.navigator.getCurrentRoutes(),prevProps,prevState);
  }

  componentDidUpdate(prevProps,prevState) {
    console.log('#_DidUpdate',this.depth,prevProps,prevState);
  }

  componentDidMount() {
    console.log('#_DidMount',this.depth);
  }

  componentWillUnmount(){
    console.log('#_WillUnmount', this.depth, this.props.navigator.getCurrentRoutes());
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
    console.log('#_Render', this.depth);

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
    height:20,
    width: width-40,
    textAlign: 'center',
    margin: 20,
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
