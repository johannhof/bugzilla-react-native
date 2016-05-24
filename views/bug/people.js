/* @flow */
import React from "react";
import ProfileImage from '../profile_image';
import User from '../user';
import {card} from './styles';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

var People = React.createClass({
  displayName: "People",

  propTypes: {
    assigned_to_detail: React.PropTypes.shape({
      email: React.PropTypes.string,
      real_name: React.PropTypes.string
    }),
    creator_detail: React.PropTypes.shape({
      email: React.PropTypes.string,
      real_name: React.PropTypes.string
    }),
    toRoute: React.PropTypes.func.isRequired
  },

  _onPressPerson(email) {
    this.props.toRoute({
      name: `User`,
      component: User,
      passProps: { email }
    });
  },

  _renderPerson(text, person) {
    return (
      <TouchableHighlight
        onPress={this._onPressPerson.bind(null, person.email)}
        style={styles.greySeparator}
        underlayColor="#E97D1F">
        <View style={styles.person}>
          <ProfileImage email={person.email} style={styles.thumbnail} />
          <Text style={styles.personText}>{text} {person.real_name}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  render() {
    return (
      <View style={[card, styles.people]}>
        {this._renderPerson("Assigned to", this.props.assigned_to_detail)}
        {this._renderPerson("Created by", this.props.creator_detail)}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  people: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  person: {
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  greySeparator: {
    flex: 1,
    borderStyle: "solid",
    borderRightColor: "#F0F0F0",
    borderRightWidth: 1
  },
  personText: {
    flex: 1,
    fontSize: 12,
    justifyContent: 'center'
  },
  thumbnail: {
    borderRadius: 10,
    marginRight: 5,
    width: 45,
    height: 45,
  }
});

export default People;
