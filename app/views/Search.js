'use strict';
import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import _ from 'lodash'

import {ScrollView,
StyleSheet,
RefreshControl,
Text,
TouchableWithoutFeedback,
View,} from 'react-native';

const styles = StyleSheet.create({
  row: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    margin: 10,
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
});


class Row extends React.Component {

  _onClick() {
    this.props.onClick(this.props.data);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onClick.bind(this)} >
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
          </Text>
          <Text style={styles.arrow}>
            >
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class RefreshControlExample extends React.Component {


// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      isRefreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(20)).map(
        (val, i) => ({text: 'Initial row ' + i, clicks: 0})),
    };
    this.depth = _.last(this.props.navigator.getCurrentRoutes());

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



  componentWillUpdate(nextProps,nextState) {
    console.log('#_WillUpdate',this.depth,nextProps,nextState);
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

  _onClick(row) {
    row.clicks++;
    this.setState({
      clicked: row.text,
      rowData: this.state.rowData,
    });

    this.props.navigator.push({view:'sample'});
  }

  render() {
    console.log('#_Render', this.depth);

    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick.bind(this)}/>;
    });
    return (
      // <View>
      //   <NavBar info={{title:'我的银行卡'}}></NavBar>
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#ff0000"
            title="Loading..."
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        {rows}
      </ScrollView>
        // </View>
    );
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      // prepend 10 items
      const rowData = Array.from(new Array(10))
        .map((val, i) => ({
          text: 'Loaded row ' + (+this.state.loaded + i),
          clicks: 0,
        }))
        .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 5000);
  }
}

module.exports = RefreshControlExample;
