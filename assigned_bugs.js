/* @flow */
import Rx from "rxjs/Rx";
import {AsyncStorage} from "react-native";
import {fetchAssignedBugs} from "./bugzilla";
import type {Bug} from './bugzilla';

const storage = Rx.Observable
  .fromPromise(AsyncStorage.getItem("assigned_bugs"))
  .map(function(json: ?string): Array<Bug> {
    if (json) {
      return JSON.parse(json);
    }

    return [];
  });

const request = Rx.Observable
  .fromPromise(fetchAssignedBugs());

const assigned = storage
  .merge(request)
  .do(function(list: ?Array<Bug>) {
    if (list) {
      AsyncStorage.setItem("assigned_bugs", JSON.stringify(list));
    } else {
      AsyncStorage.removeItem("assigned_bugs");
    }
  });

export default assigned;
