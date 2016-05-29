/* @flow */
import React from "react";
import Bug from './bug/index';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from "react-native";

const FlagListItem  = React.createClass({
  displayName: "FlagListItem",

  propTypes: {
    "Flag": React.PropTypes.string,
    "Status": React.PropTypes.string,
    "Requestee": React.PropTypes.string,
    bug: React.PropTypes.shape({
      summary: React.PropTypes.string,
      id: React.PropTypes.number,
    }).isRequired,
    toRoute: React.PropTypes.func.isRequired,
  },

  _onPress: async function() {
    this.props.toRoute({
      name: `Bug ${this.props.bug.id}`,
      component: Bug,
      passProps: this.props,
    });
  },

  render() {
    return (
      <TouchableHighlight onPress={this._onPress} underlayColor="#E97D1F">
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.head}>
            {this.props["Flag"]}{" "}{this.props["Status"]}{" "}{this.props["Requestee"]}
          </Text>
          <View style={styles.detailContainer}>
            <Text style={styles.summary}>
              {this.props.bug.summary}
            </Text>
            <Text style={styles.id}>
              {this.props.bug.id}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  row: {
    overflow: "hidden",
    paddingVertical: 15,
    paddingLeft: 16,
    borderStyle: "solid",
    borderBottomColor: "#D6D4D4",
    borderBottomWidth: 1,
  },
  detailContainer: {
    flexDirection: "row",
  },
  head: {
    fontWeight: "500",
    fontSize: 15,
    paddingRight: 5,
    marginBottom: 5,
  },
  summary: {
    flex: 5,
    fontWeight: "300",
    fontSize: 12,
  },
  id: {
    flex: 1,
    fontWeight: "300",
    color: "#9C9B9B",
    fontSize: 12,
  },
  numbers: {
    paddingRight: 5,
    alignItems: "flex-end",
    flex: 5,
  },
});

export default FlagListItem;
