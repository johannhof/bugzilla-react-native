/* @flow */
import Rx from "rxjs/Rx";
import {fetchCreatedBugs} from "./bugzilla";
import {saveJSON, loadJSON} from "./storage";
import credentials from "./credentials";

const STORAGE_KEY = "created_bugs";

const storage = Rx.Observable.from(loadJSON(STORAGE_KEY, []));

const request = credentials.filter(x => x).switchMap(function({email}) {
 return fetchCreatedBugs(email);
});

const created = storage
  .merge(request)
  .do((val) => saveJSON(STORAGE_KEY, val));

export default created;
