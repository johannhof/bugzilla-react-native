import React from "react-native";
import assigned from '../assigned_bugs';
import created from '../created_bugs';
import flags from '../flags';
import BugList from "./bug_list";
import Icon from 'react-native-vector-icons/Ionicons';

const {
  StyleSheet,
  Text,
  View,
  TabBarIOS
} = React;

const HomeView = React.createClass({
  displayName: 'HomeView',

  getInitialState() {
    return {
      selectedTab: 'assigned'
    };
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>My Bugs</Text>
        </View>
        <TabBarIOS
          style={styles.tabBar}
          tintColor="#E97D1F">
          <Icon.TabBarItem
            title="Created"
            iconName="ios-plus"
            selected={this.state.selectedTab === 'created'}
            onPress={() => this.setState({ selectedTab: 'created' }) }>
            <View style={styles.listView}>
              <BugList
                sourceStream={created}
                toRoute={this.props.toRoute} />
            </View>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="Assigned"
            iconName="ios-filing"
            selected={this.state.selectedTab === 'assigned'}
            onPress={() => this.setState({ selectedTab: 'assigned' }) }>
            <View style={styles.listView}>
              <BugList
                sourceStream={assigned}
                toRoute={this.props.toRoute} />
            </View>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="Flags"
            iconName="ios-flag"
            selected={this.state.selectedTab === 'flags'}
            onPress={() => this.setState({ selectedTab: 'flags' }) }>
            <View style={styles.listView}>
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
  titleBox: {
    height: 50,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderBottomColor: "#D6D4D4",
    borderBottomWidth: 1,
    backgroundColor: '#F0F0F0'
  },
  title: {
    fontSize: 22,
    fontWeight: "300"
  },
  listView: {
    alignSelf: "stretch"
  }
});

export default HomeView;
