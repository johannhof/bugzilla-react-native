/* @flow */
import React from "react-native";
import Rx from "rxjs/Rx";
import BugList from "./bug_list";
import {search} from "../bugzilla";

const Search = React.createClass({
  displayName: 'Search',

  propTypes: {
    query: React.PropTypes.string,
    setTitleProps: React.PropTypes.func.isRequired,
    toRoute: React.PropTypes.func.isRequired
  },

  componentWillMount() {
    let searchStream = Rx.Observable
      .fromEventPattern(
        // TODO implement unsubscribing
          h => {
              this.props.setTitleProps({
                onChange: h,
                query: this.props.query
              });
          },
          () => null
      )
      .debounceTime(1000)
      .switchMap(query => search(query));
    this.searchStream = searchStream;
  },

  render() {
    return (
      <BugList
        source={this.searchStream}
        toRoute={this.props.toRoute} />
    );
  }
});

export default Search;
