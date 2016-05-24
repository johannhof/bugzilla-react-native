/* @flow */
import React from "react";
import User from './user';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from "react-native";

const UserListItem  = React.createClass({
  displayName: "UserListItem",

  propTypes: {
    email: React.PropTypes.string.isRequired,
    real_name: React.PropTypes.string,
    toRoute: React.PropTypes.func.isRequired
  },

  _onPress: function() {
    this.props.toRoute({
      name: `User`,
      component: User,
      passProps: this.props
    });
  },

  render() {
    return (
      <TouchableHighlight onPress={this._onPress} underlayColor="#E97D1F">
        <View style={styles.row}>
          <Text style={styles.summary}>
            {this.props.real_name}
          </Text>
          <Text>
            {this.props.email}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
});

const styles = StyleSheet.create({
  row: {
    paddingVertical: 20,
    paddingLeft: 16,
    borderStyle: "solid",
    borderBottomColor: "#D6D4D4",
    borderBottomWidth: 1
  },
  detailContainer: {
    flexDirection: 'row'
  },
  summary: {
    fontWeight: "500",
    fontSize: 15
  },
  component: {
    flex: 1,
    fontWeight: "300",
    fontSize: 12
  },
  id: {
    flex: 1,
    fontWeight: "300",
    color: '#9C9B9B',
    fontSize: 12
  },
  numbers: {
    paddingRight: 5,
    alignItems: 'flex-end',
    flex: 2
  }
});

export default UserListItem;
