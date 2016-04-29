/* @flow */
import React from "react-native";
import Router from 'react-native-simple-router';
import Home from './views/home';
import Search from './views/search';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './views/menu';
import Login from './views/login';
import user from './user';
import {Mixin as EmitterMixin, events} from './emitter';
import SearchBar from "./views/navigation/search_bar";

const {
  AppRegistry,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View
} = React;

// TODO rename
const leftNavButtons = React.createClass({
  displayName: 'LeftNavButtons',
  mixins: [EmitterMixin],

  render() {
    return (
      <View style={styles.rightNavButtons}>
        <TouchableHighlight underlayColor="transparent" onPress={this.goToSearch}>
          <Icon onPress={this.emit('menuOpen')} style={styles.button} name="navicon" size={28} color="#FFF" />
        </TouchableHighlight>
      </View>
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

  getInitialState() {
    return {
      menuOpen: false
    };
  },

  componentWillMount() {
    // TODO attach off listener
    events.on('menuOpen', () => this._toggleMenu(true));
    user.subscribe(user => this.setState({user}));
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
      return <Login />;
    }
    return (
      <SideMenu
        onChange={this._toggleMenu}
        isOpen={this.state.menuOpen}
        menu={<Menu toRoute={this.toRoute} user={this.state.user} />} >
        <Router
          ref="router"
          headerStyle={styles.navbar}
          rightCorner={rightNavButtons}
          firstRoute={{
            name: "Bugzilla",
            leftCorner: leftNavButtons,
            component: Home
          }}
        />
      </SideMenu>
    );
  }
});

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#E97D1F'
  },
  button: {
    marginTop: 5,
    marginHorizontal: 10
  },
  rightNavButtons: {
    flexDirection: 'row'
  }
});

AppRegistry.registerComponent("bugzilla", () => router);
