/* @flow */
import React from "react";
import {events} from "../emitter";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from "react-native";

const LoginView = React.createClass({
  displayName: "LoginView",

  getInitialState() {
    return {
      email: "",
      key: "",
    };
  },

  _submit() {
    events.trigger("login", {
      email: this.state.email,
      key: this.state.key,
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textBoxContainer}>
          <Text>Enter your BMO username (your email)</Text>
          <TextInput
            autoCorrect={false}
            autoCapitalize={'none'}
            style={styles.textBox}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
          <Text>Enter your BMO API Key</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={key => this.setState({key})}
            value={this.state.key}
          />
        </View>
        <TouchableHighlight onPress={this._submit} underlayColor="#E97D1F">
          <View>
            <Text>Submit</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  textBoxContainer: {
    flex: 1,
    justifyContent: "center",
  },
  textBox: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default LoginView;
