/* @flow */
import React from "react-native";
import BugList from "../bug_list";
import UserList from "../user_list";
import {card} from './styles';

const {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var People = React.createClass({
  displayName: "People",

  propTypes: {
    id: React.PropTypes.number.isRequired,
    blocks: React.PropTypes.array.isRequired,
    depends_on: React.PropTypes.array.isRequired,
    cc_detail: React.PropTypes.array.isRequired,
    toRoute: React.PropTypes.func.isRequired
  },

  _onPressBlocks() {
    this.props.toRoute({
      name: `${this.props.id} blocks`,
      component: BugList,
      passProps: {
        source: this.props.blocks,
        toRoute: this.props.toRoute
      }
    });
  },

  _onPressDepends() {
    this.props.toRoute({
      name: `${this.props.id} depends on`,
      component: BugList,
      passProps: {
        source: this.props.depends_on,
        toRoute: this.props.toRoute
      }
    });
  },

  _onPressCC() {
    this.props.toRoute({
      name: `${this.props.id} CC`,
      component: UserList,
      passProps: {
        users: this.props.cc_detail,
        toRoute: this.props.toRoute
      }
    });
  },

  render() {
    return (
      <View style={[card, styles.row]}>
        <TouchableHighlight onPress={this._onPressBlocks} style={styles.block} underlayColor="#E97D1F">
            <Text style={styles.text}>Blocks {this.props.blocks.length}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressDepends} style={styles.block} underlayColor="#E97D1F">
            <Text style={styles.text}>Depends on {this.props.depends_on.length}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressCC} style={styles.block} underlayColor="#E97D1F">
            <Text style={styles.text}>{this.props.cc_detail.length} CC</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  block: {
    paddingVertical: 15,
    alignItems: 'center',
    flex: 1,
    borderStyle: "solid",
    borderRightColor: "#F0F0F0",
    borderRightWidth: 1
  },
  text: {
    flex: 1
  }
});

export default People;
