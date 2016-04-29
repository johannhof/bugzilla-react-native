/* @flow */
import Rx from "rxjs/Rx";
import React from "react-native";
import ProfileImage from './profile_image';
import Icon from 'react-native-vector-icons/Ionicons';
import Search from './search';
import BugList from "./bug_list";
import {searchURL} from "../bugzilla";

const {
  Dimensions,
  TouchableHighlight,
  ScrollView,
  View,
  Text,
  StyleSheet
} = React;

const window = Dimensions.get('window');

const Menu = React.createClass({
  displayName: 'Menu',

  propTypes: {
    toRoute: React.PropTypes.func.isRequired,
    user: React.PropTypes.shape({
      email: React.PropTypes.string.isRequired,
      real_name: React.PropTypes.string.isRequired
    }).isRequired
  },

  goToSearch({name, url}) {
    let source = Rx.Observable.fromPromise(searchURL(url));
    this.props.toRoute({
      name: name,
      component: BugList,
      passProps: { source },
      sceneConfig: null
    });
  },

  render() {
    return (
      <View style={styles.menu}>
        <Icon style={styles.settings} name="ios-gear" size={30} color="#FFF" />
        <View style={styles.header}>
          <ProfileImage style={styles.thumbnail} email={this.props.user.email} />
          <Text style={styles.username}>{this.props.user.real_name}</Text>
        </View>
        <ScrollView scrollsToTop={false} style={styles.list}>
          <Text style={[styles.item, styles.selected]}>My Bugs</Text>
          <Text style={styles.item}>Browse</Text>
          <Text style={styles.savedSearches}>Saved Searches</Text>
          <View>
            {this.props.user.saved_searches.map((search) => {
              return (
                <TouchableHighlight key={search.id} onPress={this.goToSearch.bind(this, search)} underlayColor="#E97D1F">
                  <Text style={styles.item}>
                    {search.name}
                  </Text>
                </TouchableHighlight>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#4A4A4A',
    paddingLeft: 15,
    paddingTop: 30,
    paddingRight: window.width * (1 / 3) + 15
  },
  settings: {
  },
  header: {
    alignItems: 'center',
    marginBottom: 20
  },
  username: {
    fontWeight: '100',
    fontSize: 16,
    color: 'white'
  },
  thumbnail: {
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    width: 60,
    height: 60,
    marginBottom: 10
  },
  list: {
    flex: 1
  },
  item: {
    color: 'white',
    fontSize: 22,
    fontWeight: '300',
    marginHorizontal: 5,
    marginVertical: 15
  },
  selected: {
    fontWeight: '500'
  },
  savedSearches: {
    color: 'white',
    fontSize: 16,
    fontWeight: '100',
    margin: 5,
    marginTop: 20,
    opacity: 0.7
  }
});

export default Menu;
