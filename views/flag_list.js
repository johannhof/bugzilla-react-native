import React from "react-native";
import BugListItem from './bug_list_item';

const {
  ListView,
  ActivityIndicatorIOS
} = React;

var FlagList = React.createClass({
  displayName: 'FlagList',

  propTypes: {
    ids: React.PropTypes.array,
    sourceStream: React.PropTypes.object,
    toRoute: React.PropTypes.func
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      })
    };
  },

  async componentWillMount() {
    if (this.props.sourceStream) {
      this.props.sourceStream.subscribe(bugs => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(bugs)
        });
      });
    }
  },

  // TODO: use a FlagListItem or so (with individual style) instead of BugListItem
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
