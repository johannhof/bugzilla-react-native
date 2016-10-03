/* @flow */
import Rx from "rxjs/Rx";
import {events} from "./emitter";
import {saveJSON, loadJSON} from "./storage";
import {setCredentials} from "./bugzilla";

const STORAGE_KEY = "credentials";

const storage = Rx.Observable.from(loadJSON(STORAGE_KEY));

const login = Rx.Observable.fromEvent(events, "login");
const logout = Rx.Observable.fromEvent(events, "logout").map(() => {});

const credentials = storage
  .merge(login)
  .merge(logout)
  .do(function(creds={}) {
    setCredentials(creds.key, creds.email);
  })
  .do((val) => saveJSON(STORAGE_KEY, val));

export default credentials.publishBehavior(null).refCount();
