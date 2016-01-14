import React from "react-native";
import Title from './title';
import People from './people';
import Stats from './stats';
import Comment from './comment';
import {container} from './styles';

const {
  View,
  ListView,
  Text,
  ActivityIndicatorIOS,
  StyleSheet
} = React;

var BugView = React.createClass({
  displayName: "Bug",

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (row1, row2) => row1.id !== row2.id
      }).cloneWithRowsAndSections({
        comments: ['loading']
      }, ['comments'])
    };
  },

  async componentWillMount() {
    let res = await fetch(`https://bugzilla.mozilla.org/rest/bug/${this.props.id}/comment`);
    let {bugs} = await res.json();

    this.setState({
      comments: bugs[this.props.id].comments,
      dataSource: this.state.dataSource.cloneWithRowsAndSections({
        comments: bugs[this.props.id].comments
      }, ['comments'])
    });
  },

  _renderHeader() {
    return (
      <View>
        <Title {...this.props} />
        <People {...this.props} />
        <Stats {...this.props} />
      </View>
    );
  },

  _renderSectionHeader(sectionData, sectionID) {
    switch (sectionID) {
      case 'comments':
        return <Text style={styles.sectionHeader}>Comments</Text>;
      case 'attachments':
        return <Text style={styles.sectionHeader}>Attachments</Text>;
    }
    return null;
  },

  _renderRow(rowData, sectionID) {
    if (rowData === 'loading') {
      return (
        <ActivityIndicatorIOS
          animating={true}
          style={{height: 50}}
          size="large"
        />
      );
    }
    switch (sectionID) {
      case 'comments':
        return <Comment {...rowData} />;
    }
    return <View />;
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={this._renderHeader}
        renderRow={this._renderRow}
        renderSectionHeader={this._renderSectionHeader}
        style={container}
        />
    );
  }
});

var styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 16,
    paddingVertical: 5,
    marginBottom: 10,
    textAlign: 'center',
    color: "#666"
  }
});

export default BugView;
