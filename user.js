/* @flow */
import Rx from "rxjs/Rx";
import {AsyncStorage} from "react-native";
import {fetchUser} from "./bugzilla";

const storage = Rx.Observable
  .fromPromise(AsyncStorage.getItem("user"))
  .map(function(json) {
    if (json) {
      return JSON.parse(json);
    }
  });

const request = Rx.Observable
  .fromPromise(fetchUser());

const user = storage
  .merge(request)
  .do(function(user) {
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
    } else {
      AsyncStorage.removeItem("user");
    }
  });

export default user;
