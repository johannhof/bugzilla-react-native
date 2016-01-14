import React from "react-native";
import Rx from "rxjs/Rx";
import assigned from '../assigned_bugs';
import created from '../created_bugs';
import BugList from "./bug_list";
import Icon from 'react-native-vector-icons/Ionicons';

const {
  StyleSheet,
  Text,
  View,
  TabBarIOS
} = React;

const HomeView = React.createClass({
  displayName: 'HomeView',

  getInitialState() {
    return {};
  },

  componentWillMount() {
    this.searchStream = Rx.Observable
      .fromEventPattern(
        // TODO implement unsubscribing
          h => {
              this.props.setTitleProps({
                onChange: h
              });
          }
      )
      .debounceTime(1000)
      .switchMap(function(search){
        return fetch(`https://bugzilla.mozilla.org/rest/bug?include_fields=summary,component,id,cc,status,product,last_change_time,assigned_to,creator,blocks,depends_on&bug_status&quicksearch=${search}&limit=10`).then(res => res.json());
      })
      .map(({bugs}) => bugs);
  },

  render() {
    return (
      <BugList
        sourceStream={this.searchStream}
        toRoute={this.props.toRoute} />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  titleBox: {
    height: 50,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderBottomColor: "#D6D4D4",
    borderBottomWidth: 1,
    backgroundColor: '#F0F0F0'
  },
  title: {
    fontSize: 22,
    fontWeight: "300"
  },
  listView: {
    alignSelf: "stretch"
  }
});

export default HomeView;
