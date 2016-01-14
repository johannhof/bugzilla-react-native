import React from "react-native";
import Bug from './bug/index';

const {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

const BugListItem  = React.createClass({
  displayName: "BugListItem",

  propTypes: {
    summary: React.PropTypes.string.isRequired,
    component: React.PropTypes.string,
    id: React.PropTypes.number.isRequired,
    cc: React.PropTypes.array.isRequired,
    toRoute: React.PropTypes.func.isRequired
  },

  _onPress: async function() {
    this.props.toRoute({
      name: `Bug ${this.props.id}`,
      component: Bug,
      passProps: this.props
    });
  },

  render() {
    return (
      <TouchableHighlight onPress={this._onPress} underlayColor="#E97D1F">
        <View style={styles.row}>
          <Text style={styles.summary}>
            {this.props.summary}
          </Text>
          <View style={styles.detailContainer}>
            <Text style={styles.component}>
              {this.props.component}
            </Text>
            <Text style={styles.id}>
              {this.props.id}
            </Text>
            <View style={styles.numbers}>
              <Text style={styles.id}>
                {this.props.cc.length}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    paddingVertical: 20,
    paddingLeft: 16,
    borderStyle: "solid",
    borderBottomColor: "#D6D4D4",
    borderBottomWidth: 1,
  },
  detailContainer: {
    flexDirection: 'row'
  },
  summary: {
    fontWeight: "500",
    fontSize: 15
  },
  component: {
    flex: 1,
    fontWeight: "300",
    fontSize: 12
  },
  id: {
    flex: 1,
    fontWeight: "300",
    color: '9C9B9B',
    fontSize: 12
  },
  numbers: {
    paddingRight: 5,
    alignItems: 'flex-end',
    flex: 2
  }
});

export default BugListItem;
