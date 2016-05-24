/* @flow */
import React from "react";
import {events} from '../emitter';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from "react-native";

const SettingsView = React.createClass({
  displayName: 'SettingsView',

  render() {
    return (
      <TouchableHighlight onPress={events.emit('logout')} underlayColor="#E97D1F">
        <View>
          <Text>Log out</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

export default SettingsView;
