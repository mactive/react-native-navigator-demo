/**
 * mactive@gmail.com
 * 2016-03-09
 */

'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

const {
  width,
  height
} = Dimensions.get('window')


class Login extends Component {
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

const styles = Stylesheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title:{
    fontSize: 20,
    height:80,
    widht: width/2,
    textAlign: 'center'
  }
})

module.exports = Login;
