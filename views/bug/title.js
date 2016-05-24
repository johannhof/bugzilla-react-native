/* @flow */
import React from "react";
import {card} from './styles';

import {
  StyleSheet,
  Text,
  View
} from "react-native";

var Title = React.createClass({
  displayName: "Title",

  propTypes: {
    summary: React.PropTypes.string,
    product: React.PropTypes.string,
    component: React.PropTypes.string,
    status: React.PropTypes.string,
    last_change_time: React.PropTypes.string
  },

  render() {
    return (
      <View style={card}>
        <View style={styles.header}>
          <Text style={styles.summary}>{this.props.summary}</Text>
          <Text style={styles.component}>{this.props.product} - {this.props.component}</Text>
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.status}>Status: {this.props.status}</Text>
          <Text style={styles.lastChange}>{this.props.last_change_time}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    padding: 10
  },
  summary: {
    textAlign: 'center',
    fontWeight: "500",
    fontSize: 17,
    marginBottom: 5
  },
  component: {
    textAlign: 'center',
    fontWeight: "300",
    fontSize: 12
  },
  subHeader: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 5,
    justifyContent: 'space-between'
  },
  status: {
    fontSize: 12
  },
  lastChange: {
    fontSize: 12
  }
});

export default Title;
