import React from "react-native";
import Router from 'gb-native-router';
import Home from './views/home';
import Search from './views/search';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './views/menu';
import {Mixin as EmitterMixin, events} from './emitter';

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
  },

  _toggleMenu(isOpen) {
    this.setState({menuOpen: isOpen});
  },

  render() {
    return (
      <SideMenu onChange={this._toggleMenu} isOpen={this.state.menuOpen} menu={<Menu />}>
        <Router
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
