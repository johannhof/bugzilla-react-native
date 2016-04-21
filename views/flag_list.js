/* @flow */
import React from "react-native";
import BugListItem from './bug_list_item';

const {
  ListView,
  ActivityIndicatorIOS
} = React;

const FlagList = React.createClass({
  propTypes: {
    source: React.PropTypes.object.isRequired,
    toRoute: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      })
    };
  },

  componentWillMount() {
    this.props.source.subscribe(bugs => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(bugs)
      });
    });
  },

  render() {
    if (this.state.dataSource.getRowCount() === 0) {
      return (
        <ActivityIndicatorIOS
        animating={true}
        style={{height: 80}}
        size="large"
        />
      );
    }
    return (
      <ListView
      dataSource={this.state.dataSource}
      renderRow={ flag => <BugListItem toRoute={this.props.toRoute} {...flag.bug} /> }
      />
    );
  }
});

export default FlagList;
