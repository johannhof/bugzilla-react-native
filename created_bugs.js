/* @flow */
import Rx from "rxjs/Rx";
import {AsyncStorage} from "react-native";
import {fetchCreatedBugs} from "./bugzilla";
import type {Bug} from './bugzilla';

const storage = Rx.Observable
  .fromPromise(AsyncStorage.getItem("created_bugs"))
  .map(function(json: ?string): Array<Bug> {
    if (json) {
      return JSON.parse(json);
    }
    return [];
  });

const request = Rx.Observable
  .fromPromise(fetchCreatedBugs());

const created = storage
  .merge(request)
  .do(function(list: ?Array<Bug>) {
    if (list) {
      AsyncStorage.setItem("created_bugs", JSON.stringify(list));
    } else {
      AsyncStorage.removeItem("created_bugs");
    }
  });

export default created;
