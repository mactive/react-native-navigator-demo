'use strict';
import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import _ from 'lodash'
import SGListView from 'react-native-sglistview';

import {
  ListView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
  Dimensions
} from 'react-native';

const {
  width,
  height
} = Dimensions.get('window')


const styles = StyleSheet.create({
  row: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'flex-start',
    color: '#0D47A1',
    flex: 10
  },
  arrow: {
    alignSelf: 'flex-end',
    color: '#0D47A1',
    fontSize: 16,
    flex:1
  },
  scrollview: {
    flex: 1,
  },
  lv:{
    backgroundColor: '#fff',
    height: height
  },
});


class PhoneList extends React.Component {


// 构造
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = Array.from(new Array(400)).map(
        (val, i) => ({text: 'Initial row ' + i, clicks: 0}));

    this.state = {
      dataSource: ds.cloneWithRows(dataSource)
    };
    this.depth = _.last(this.props.navigator.getCurrentRoutes());

  }

  _onClick(row) {
    row.clicks++;
    this.setState({
      clicked: row.text,
      rowData: this.state.rowData,
    });

    this.props.navigator.push({view:'sample'});
  }

  renderRow(rowData) {

    var row = <Text style={styles.text}>{rowData.text}</Text>

    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={() => this._onClick(rowData)}>
          {row}
          <Text style={styles.arrow}>
            >
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.lv}
          scrollRenderAheadDistance={5}
          pageSize={1}
          initialListSize={1}
          removeClippedSubviews = {true}
        />
      </View>
    );
  }

  /** == life cycle start == **/

  componentWillReceiveProps(nextProps) {
    // console.log('#_WillReceiveProps',this.depth,nextProps);
  }

  componentWillMount() {
    // console.log('#_WillMount',this.depth);
  }


  componentWillUpdate(nextProps,nextState) {
    // console.log('#_WillUpdate',this.depth,nextProps,nextState);
  }

  componentDidUpdate(prevProps,prevState) {
    // console.log('#_DidUpdate',this.depth,prevProps,prevState);
  }

  componentDidMount() {
    // console.log('#_DidMount',this.depth);
  }

  componentWillUnmount(){
    // console.log('#_WillUnmount', this.depth, this.props.navigator.getCurrentRoutes());
  }

  /** == life cycle end == **/

}

module.exports = PhoneList;
