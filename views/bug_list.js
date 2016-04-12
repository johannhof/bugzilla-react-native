import React from "react-native";
import BugListItem from './bug_list_item';

const {
  ListView,
  ActivityIndicatorIOS
} = React;

const fetchBugs = function(bugs) {
  return fetch(`https://bugzilla.mozilla.org/rest/bug?id=${bugs.join(',')}`).then(res => res.json());
};

var BugList = React.createClass({
  displayName: 'BugList',

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
    } else {
      let {bugs} = await fetchBugs(this.props.ids);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(bugs)
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