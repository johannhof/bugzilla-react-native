/* @flow */
import React from "react";
import ProfileImage from "../profile_image";
import {card} from "./styles";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

var Comment = React.createClass({
  displayName: "Comment",

  propTypes: {
    creator: React.PropTypes.string.isRequired,
    time: React.PropTypes.string,
    text: React.PropTypes.string.isRequired,
  },

  render() {
    return (
      <View style={card}>
        <View style={styles.info}>
          <View>
            <ProfileImage email={this.props.creator} style={styles.thumbnail} />
          </View>
          <View>
            <Text style={styles.infoText}>{this.props.creator}</Text>
            <Text style={styles.infoText}>{this.props.time}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text>{this.props.text}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  info: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    paddingBottom: 0,
  },
  thumbnail: {
    flex: 1,
    borderRadius: 10,
    marginRight: 10,
    height: 35,
    width: 35,
  },
  textContainer: {
    padding: 10,
    alignSelf: "stretch",
  },
  infoText: {
    color: "#9C9B9B",
    marginBottom: 2,
  },
});


export default Comment;
