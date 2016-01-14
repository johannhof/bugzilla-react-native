import React from "react-native";
import Router from 'gb-native-router';
import Home from './views/home';
import Search from './views/search';
var Icon = require('react-native-vector-icons/Ionicons');

const {
  AppRegistry,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View
} = React;


var SearchBar = React.createClass({
  displayName: 'SearchBar',

  propTypes: {
    onChange: React.PropTypes.func
  },

  render() {
    return (
      <TextInput
        style={styles.input}
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(text) => this.props.onChange(text)}
        placeholder="Search Bugzilla" />
    );
  }
});

const rightNavButtons = React.createClass({
  displayName: 'RightNavButtons',

  propTypes: {
    toRoute: React.PropTypes.func.isRequired
  },

  goToSearch() {
    this.props.toRoute({
      name: "Search",
      component: Search,
      titleComponent: SearchBar
    });
  },

  render() {
    return (
      <View style={styles.rightNavButtons}>
        <TouchableHighlight underlayColor="transparent" onPress={this.goToSearch}>
          <Icon style={styles.button} name="ios-search-strong" size={25} color="#FFF" />
        </TouchableHighlight>
        <Icon style={styles.button} name="plus" size={25} color="#FFF" />
      </View>
    );
  }
});

const router = React.createClass({
  displayName: 'Bugzilla Router',

  render() {
    return (
      <Router
        headerStyle={styles.navbar}
        rightCorner={rightNavButtons}
        firstRoute={{
          name: "Bugzilla",
          component: Home
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#E97D1F'
  },
  button: {
    marginTop: 5,
    marginHorizontal: 10
  },
  rightNavButtons: {
    flexDirection: 'row'
  },
  input: {
    backgroundColor: '#F5A623',
    width: 220,
    height: 32,
    marginTop: 6,
    paddingLeft: 10,
    color: 'white',
    borderRadius: 4
  }
});

AppRegistry.registerComponent("bugzilla", () => router);
