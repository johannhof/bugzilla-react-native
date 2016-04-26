/* @flow */
import Rx from "rxjs/Rx";
import {AsyncStorage} from "react-native";
import {events} from "./emitter";

const storage = Rx.Observable.fromPromise(AsyncStorage.getItem("api_key"));
const request = Rx.Observable.fromEvent(events, "setApiKey");

const key = storage
  .merge(request)
  .do(function(key) {
    if (key) {
      AsyncStorage.setItem("api_key", key);
    } else {
      AsyncStorage.removeItem("api_key");
    }
  });

export default key.publishBehavior(null).refCount();
