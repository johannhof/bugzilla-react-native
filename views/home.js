/* @flow */
import React from "react";
import assigned from '../assigned_bugs';
import created from '../created_bugs';
import flags from '../flags';
import BugList from "./bug_list";
import FlagList from "./flag_list";
import Icon from 'react-native-vector-icons/Ionicons';

import {
  StyleSheet,
  View,
  TabBarIOS
} from "react-native";

const HomeView = React.createClass({
  displayName: "HomeView",

  propTypes: {
    toRoute: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      selectedTab: "flags"
    };
  },

  render() {
    return (
      <View style={styles.container}>
        <TabBarIOS
          style={styles.tabBar}
          tintColor="#E97D1F">
          <Icon.TabBarItem
            title="Created"
            iconName="ios-plus"
            selected={this.state.selectedTab === "created"}
            onPress={() => this.setState({ selectedTab: "created" }) }>
            <View style={styles.listView}>
              <BugList
                source={created}
                toRoute={this.props.toRoute} />
            </View>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="Assigned"
            iconName="ios-filing"
            selected={this.state.selectedTab === "assigned"}
            onPress={() => this.setState({ selectedTab: "assigned" }) }>
            <View style={styles.listView}>
              <BugList
                source={assigned}
                toRoute={this.props.toRoute} />
            </View>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="Flags"
            iconName="ios-flag"
            selected={this.state.selectedTab === "flags"}
            onPress={() => this.setState({ selectedTab: "flags" }) }>
            <View style={styles.listView}>
              <FlagList
                source={flags}
                toRoute={this.props.toRoute} />
            </View>
          </Icon.TabBarItem>
        </TabBarIOS>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 22,
    fontWeight: "300"
  },
  listView: {
    flex: 1
  }
});

export default HomeView;
