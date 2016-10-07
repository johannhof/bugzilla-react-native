/* @flow */
import React from "react";
import Bug from "./bug/index";
import Icon from "react-native-vector-icons/Entypo";

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";

const BugListItem  = React.createClass({
  displayName: "BugListItem",

  propTypes: {
    summary: React.PropTypes.string.isRequired,
    component: React.PropTypes.string,
    id: React.PropTypes.number.isRequired,
    is_open: React.PropTypes.bool,
    cc: React.PropTypes.array.isRequired,
    toRoute: React.PropTypes.func.isRequired,
  },

  _onPress: function() {
    this.props.toRoute({
      name: `Bug ${this.props.id}`,
      component: Bug,
      passProps: this.props,
    });
  },

  render() {
    return (
      <TouchableHighlight onPress={this._onPress} underlayColor="#E97D1F">
        <View style={styles.row}>
          <Text numberOfLines={1} style={[styles.summary, {
            textDecorationLine: this.props.is_open === false ?  "line-through" : "none",
          }]}>
            {this.props.summary}
          </Text>
          <View style={styles.detailContainer}>
            <View style={styles.componentID}>
              <Text style={styles.id}>
                {this.props.id}
              </Text>
              <Text style={styles.component}>
                {this.props.component}
              </Text>
            </View>
            <View style={styles.numbers}>
              <Text style={styles.id}>
                <Icon name="users" size={10} color="#9C9B9B" />
                {" "}
                {this.props.cc.length}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

const styles = StyleSheet.create({
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
  summary: {
    fontWeight: "500",
    fontSize: 15,
    paddingRight: 5,
    marginBottom: 5,
  },
  componentID: {
    flex: 4,
    flexDirection: "row",
  },
  component: {
    fontWeight: "300",
    fontSize: 12,
  },
  id: {
    fontWeight: "300",
    color: "#9C9B9B",
    fontSize: 12,
    paddingRight: 5,
  },
  numbers: {
    flex: 5,
    paddingRight: 5,
    alignItems: "flex-end",
  },
});

export default BugListItem;
