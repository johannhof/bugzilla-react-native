/* @flow */
import Rx from "rxjs/Rx";
import {AsyncStorage} from "react-native";
import {fetchFlags} from "./bugzilla";

const storage = Rx.Observable
  .fromPromise(AsyncStorage.getItem("flags"))
  .map(function(json) {
    if (json) {
      return JSON.parse(json);
    }
    return [];
  });

const request = Rx.Observable
  .fromPromise(fetchFlags());

const flags = storage
  .merge(request)
  .do(function(list) {
    if (list) {
      AsyncStorage.setItem("flags", JSON.stringify(list));
    } else {
      AsyncStorage.removeItem("flags");
    }
  });

export default flags;
