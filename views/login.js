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

  propTypes: {
    error: React.PropTypes.any,
  },

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
        {this.props.error &&
          <Text testID="errorMessage">
            {this.props.error.message}
          </Text>
        }
        <Text>Enter your BMO username (your email)</Text>
        <TextInput
          placeholder="Username"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          returnKeyType="next"
          autoCapitalize="none"
          style={styles.textBox}
          onChangeText={email => this.setState({email})}
          onSubmitEditing={() => this.refs.password.focus() }
          value={this.state.email}
        />
        <Text>Enter your BMO API Key</Text>
        <TextInput
          ref="password"
          placeholder="API Key"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          returnKeyType="done"
          autoCapitalize="none"
          style={styles.textBox}
          onChangeText={key => this.setState({key})}
          onSubmitEditing={this._submit}
          value={this.state.key}
        />
        <TouchableHighlight 
          testID="Submit"
          onPress={this._submit}
          underlayColor="#E97D1F">
          <View style={styles.button}>
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
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  textBox: {
    marginTop: 5,
    marginBottom: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  button: {
    flex: 1,
    height: 30,
    paddingHorizontal: 50,
    borderColor: "gray",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginView;
