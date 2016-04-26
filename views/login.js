/* @flow */
import React from "react-native";
import {events} from '../emitter';

const {
  StyleSheet,
  Text,
  TextInput,
  View
} = React;

const LoginView = React.createClass({
  displayName: 'LoginView',

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textBoxContainer}>
          <Text>Enter your BMO API Key</Text>
          <TextInput
            style={styles.textBox}
            onSubmitEditing={text => events.trigger("setApiKey", [text])}
          />
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  textBoxContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default LoginView;
