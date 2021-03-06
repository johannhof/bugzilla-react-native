/* @flow */
import React from "react";
import {events} from "../emitter";

import {
  Text,
  View,
  TouchableHighlight,
} from "react-native";

const SettingsView = React.createClass({
  displayName: "SettingsView",

  render() {
    return (
      <TouchableHighlight
        testID="logoutButton"
        onPress={events.emit("logout")}
        underlayColor="#E97D1F">
        <View>
          <Text>Log out</Text>
        </View>
      </TouchableHighlight>
    );
  },
});

export default SettingsView;
