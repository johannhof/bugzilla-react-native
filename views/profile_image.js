import React from "react-native";
import md5 from "md5";

const {
  Image
} = React;

var ProfileImage = React.createClass({
  displayName: 'ProfileImage',

  propTypes: {
    email: React.PropTypes.string.isRequired,
    style: React.PropTypes.any
  },

  getInitialState() {
    return {
      hash: this._computeHash()
    };
  },

  willReceiveProps() {
    this.setState({
      hash: this._computeHash()
    });
  },

  _computeHash() {
    return md5(this.props.email.trim().toLowerCase());
  },

  render() {
    return (
      <Image
        source={{uri: `http://www.gravatar.com/avatar/${this.state.hash}?s=256`}}
        style={this.props.style} />
    );
  }
});

export default ProfileImage;
