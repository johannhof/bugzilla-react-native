/* @flow */
import React from "react";
import BugListItem from "./bug_list_item";
import {fetchBugs} from "../bugzilla";

import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
} from "react-native";

const BugList = React.createClass({
  propTypes: {
    source: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]).isRequired,
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
    if (Array.isArray(this.props.source)) {
      fetchBugs(this.props.source).then(bugs => {
        this.setState({
          loading: false,
          dataSource: this.state.dataSource.cloneWithRows(bugs),
        });
      });
    } else if (this.props.source != null) {
      this.props.source.subscribe(bugs => {
        this.setState({
          loading: false,
          dataSource: this.state.dataSource.cloneWithRows(bugs),
        });
      });
    }
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
          <Text style={styles.emptyText}>No bugs found.</Text>
        </View>
      );
    }
    return (
      <ListView
      dataSource={this.state.dataSource}
      renderRow={ bug => <BugListItem toRoute={this.props.toRoute} {...bug} /> }
      />
    );
  },
});

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    paddingTop: 20,
    //justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#9C9B9B",
    fontSize: 20,
  },
});

export default BugList;
