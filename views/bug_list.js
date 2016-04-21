/* @flow */
import React from "react-native";
import BugListItem from './bug_list_item';
import {fetchBugs} from '../bugzilla';

const {
  ListView,
  ActivityIndicatorIOS
} = React;

const BugList = React.createClass({
  propTypes: {
    source: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]).isRequired,
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
    if (Array.isArray(this.props.source)) {
      fetchBugs(this.props.source).then(bugs => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(bugs)
        });
      });
    } else if (this.props.source != null) {
      this.props.source.subscribe(bugs => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(bugs)
        });
      });
    }
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
      renderRow={ bug => <BugListItem toRoute={this.props.toRoute} {...bug} /> }
      />
    );
  }
});

export default BugList;
