/* @flow */
import React from "react";
import UserListItem from "./user_list_item";

import {
  ListView,
} from "react-native";

var UserList = React.createClass({
  displayName: "UserList",

  propTypes: {
    users: React.PropTypes.array.isRequired,
    toRoute: React.PropTypes.func,
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id,
      }).cloneWithRows(this.props.users),
    };
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={ user => <UserListItem toRoute={this.props.toRoute} {...user} /> }
        />
    );
  },
});

export default UserList;
