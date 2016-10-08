/* @flow */
import React from "react";
import Title from "./title";
import People from "./people";
import Stats from "./stats";
import Comment from "./comment";
import {container} from "./styles";
import {UserType, fetchComments} from "../../bugzilla";

import {
  View,
  ListView,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const BugView = React.createClass({
  displayName: "Bug",

  propTypes: {
    id: React.PropTypes.number.isRequired,
    toRoute: React.PropTypes.func.isRequired,
    assigned_to_detail: React.PropTypes.shape(UserType).isRequired,
    creator_detail: React.PropTypes.shape(UserType).isRequired,
    blocks: React.PropTypes.array.isRequired,
    depends_on: React.PropTypes.array.isRequired,
    cc_detail: React.PropTypes.array.isRequired,
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (row1, row2) => row1.id !== row2.id,
      }).cloneWithRowsAndSections({
        comments: ["loading"],
      }, ["comments"]),
    };
  },

  componentWillMount() {
    fetchComments(this.props.id).then(comments => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections({comments}, ["comments"]),
      });
    });
  },

  _renderHeader() {
    return (
      <View>
        <Title {...this.props} />
        <People {...this.props} />
        <Stats {...this.props} />
      </View>
    );
  },

  _renderSectionHeader(_sectionData: any, sectionID: string) {
    switch (sectionID) {
      case "comments":
        return <Text style={styles.sectionHeader}>Comments</Text>;
      case "attachments":
        return <Text style={styles.sectionHeader}>Attachments</Text>;
    }
    return null;
  },

  _renderRow(rowData: Object | string, sectionID: string) {
    if (typeof rowData !== "string") {
      switch (sectionID) {
        case "comments":
          return <Comment {...rowData} />;
      }
    } else if (rowData === "loading") {
      return (
        <ActivityIndicator
          animating={true}
          style={{height: 50}}
          size="large"
        />
      );
    }
    return <View />;
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={this._renderHeader}
        renderRow={this._renderRow}
        renderSectionHeader={this._renderSectionHeader}
        style={container}
        />
    );
  },
});

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 16,
    paddingVertical: 5,
    marginBottom: 10,
    textAlign: "center",
    color: "#666",
  },
});

export default BugView;
