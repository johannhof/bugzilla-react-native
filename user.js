/* @flow */
import Rx from "rxjs/Rx";
import {fetchUser} from "./bugzilla";
import credentials from "./credentials";
import {saveJSON, loadJSON} from "./storage";

const STORAGE_KEY = "user";

const storage = Rx.Observable.from(loadJSON(STORAGE_KEY));

const request = credentials.switchMap(function(creds) {
  if (creds) {
   return fetchUser();
  }
  return Promise.resolve(null);
});

const user = storage
  .merge(request)
  .do((val) => saveJSON(STORAGE_KEY, val));

export default user;
