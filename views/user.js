/* @flow */
import React from "react";
import ProfileImage from './profile_image';

import {
  StyleSheet,
  Text,
  View
} from "react-native";

const UserView = React.createClass({
  displayName: 'UserView',

  propTypes: {
    email: React.PropTypes.string.isRequired,
    real_name: React.PropTypes.string
  },

  render() {
    let email = this.props.email;
    return (
      <View style={styles.container}>
        <View style={styles.userBox}>
          <ProfileImage email={email} style={styles.thumbnail} />
          <Text style={styles.userBoxTitle}>{email}</Text>
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
  userBox: {
    flex: 2,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderBottomColor: "#D6D4D4",
    borderBottomWidth: 1,
    backgroundColor: '#F0F0F0'
  },
  userBoxTitle: {
    fontSize: 22,
    fontWeight: "300"
  },
  thumbnail: {
    borderRadius: 38,
    width: 75,
    height: 75,
    marginBottom: 10
  }
});


export default UserView;
