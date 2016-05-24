/* @flow */
import Rx from "rxjs/Rx";
import {AsyncStorage} from "react-native";
import {fetchFlags} from "./bugzilla";
import {saveJSON, loadJSON} from "./storage";
import credentials from "./credentials";

const STORAGE_KEY = "flags";

const storage = Rx.Observable.from(loadJSON(STORAGE_KEY, []));

const request = credentials.filter(x => x).switchMap(function({email}) {
 return fetchFlags(email);
});

const flags = storage
  .merge(request)
  .do((val) => saveJSON(STORAGE_KEY, val))

export default flags;
