/* @flow */
import React from "react";
import Router from "react-native-simple-router";
import Home from "./views/home";
import Search from "./views/search";
import SideMenu from "react-native-side-menu";
import Icon from "react-native-vector-icons/Entypo";
import Menu from "./views/menu";
import Login from "./views/login";
import user from "./user";
import {events} from "./emitter";
import SearchBar from "./views/navigation/search_bar";

import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";

// TODO rename
const leftNavButtons = React.createClass({
  displayName: "LeftNavButtons",

  render() {
    return (
      <View style={styles.rightNavButtons}>
        <Icon onPress={events.emit("menuOpen")} style={styles.button} name="menu" size={28} color="#FFF" />
      </View>
    );
  },
});

const rightNavButtons = React.createClass({
  displayName: "RightNavButtons",

  propTypes: {
    toRoute: React.PropTypes.func.isRequired,
  },

  goToSearch() {
    this.props.toRoute({
      name: "Search",
      component: Search,
      titleComponent: SearchBar,
    });
  },

  render() {
    return (
      <View style={styles.rightNavButtons}>
        <TouchableHighlight underlayColor="transparent" onPress={this.goToSearch}>
          <Icon style={styles.button} name="magnifying-glass" size={25} color="#FFF" />
        </TouchableHighlight>
        <Icon style={styles.button} name="plus" size={25} color="#FFF" />
      </View>
    );
  },
});

const router = React.createClass({
  displayName: "Bugzilla Router",

  getInitialState() {
    return {
      menuOpen: false,
      user: null,
      error: null,
    };
  },

  componentWillMount() {
    // TODO attach off listener
    events.on("menuOpen", () => this._toggleMenu(true));
    user.subscribe(user => this.setState({user}), err => this.setState({user: null, error: err}));
  },

  toRoute(options) {
    this.refs.router.toRoute(options);
    this.setState({menuOpen: false});
  },

  _toggleMenu(isOpen) {
    this.setState({menuOpen: isOpen});
  },

  render() {
    if (!this.state.user) {
      return <Login error={this.state.error} />;
    }
    return (
      <SideMenu
        onChange={this._toggleMenu}
        isOpen={this.state.menuOpen}
        menu={<Menu toRoute={this.toRoute} user={this.state.user} />} >
        <Router
          ref="router"
          headerStyle={styles.navbar}
          backButtonComponent={() => <Icon name="chevron-thin-left" style={styles.button} size={28} color="#FFF" />}
          rightCorner={rightNavButtons}
          firstRoute={{
            name: "Bugzilla",
            leftCorner: leftNavButtons,
            component: Home,
          }}
        />
      </SideMenu>
    );
  },
});

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#E97D1F",
  },
  button: {
    marginTop: 5,
    marginHorizontal: 10,
  },
  rightNavButtons: {
    flexDirection: "row",
  },
});

AppRegistry.registerComponent("bugzilla", () => router);
