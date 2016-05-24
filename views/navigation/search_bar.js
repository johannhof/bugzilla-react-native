/* @flow */
import React from "react";

import {
  StyleSheet,
  TextInput
} from "react-native";

const SearchBar = React.createClass({
  displayName: 'SearchBar',

  propTypes: {
    onChange: React.PropTypes.func
  },

  componentWillMount() {
    if (this.props.onChange && this.props.query) {
      this.props.onChange(this.props.query);
    }
  },

  render() {
    return (
      <TextInput
        style={styles.input}
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="none"
        defaultValue={this.props.query}
        onChangeText={(text) => this.props.onChange && this.props.onChange(text)}
        placeholder="Search Bugzilla" />
    );
  }
});

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F5A623',
    height: 32,
    marginTop: 6,
    paddingLeft: 10,
    color: 'white',
    borderRadius: 4
  }
});

export default SearchBar;
