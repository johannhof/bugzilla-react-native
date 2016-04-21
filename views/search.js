/* @flow */
import React from "react-native";
import Rx from "rxjs/Rx";
import BugList from "./bug_list";

const Search = React.createClass({
  displayName: 'Search',

  propTypes: {
    setTitleProps: React.PropTypes.func.isRequired,
    toRoute: React.PropTypes.func.isRequired
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
        return fetch(`https://bugzilla.mozilla.org/rest/bug?include_fields=summary,component,id,cc,status,product,last_change_time,assigned_to,creator,blocks,depends_on&bug_status&quicksearch=${search}&limit=15`).then(res => res.json());
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

export default Search;
