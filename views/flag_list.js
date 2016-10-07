/* @flow */
import React from "react";
import FlagListItem from "./flag_list_item";

// TODO: prevent duplication with bug_list

import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
} from "react-native";

const FlagList = React.createClass({
  propTypes: {
    source: React.PropTypes.object.isRequired,
    toRoute: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      loading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id,
      }),
    };
  },

  componentWillMount() {
    this.props.source.subscribe(bugs => {
      this.setState({
        loading: false,
        dataSource: this.state.dataSource.cloneWithRows(bugs),
      });
    });
  },

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
        animating={true}
        style={{height: 80}}
        size="large"
        />
      );
    }
    if (this.state.dataSource.getRowCount() === 0) {
      return (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No flags found.</Text>
        </View>
      );
    }
    return (
      <ListView
      dataSource={this.state.dataSource}
      renderRow={ flag => <FlagListItem toRoute={this.props.toRoute} {...flag} /> }
      />
    );
  },
});

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#9C9B9B",
    fontSize: 20,
  },
});

export default FlagList;
