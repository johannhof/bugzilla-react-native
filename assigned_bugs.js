/* @flow */
import Rx from "rxjs/Rx";
import {fetchAssignedBugs} from "./bugzilla";
import {saveJSON, loadJSON} from "./storage";
import credentials from "./credentials";

const STORAGE_KEY = "assigned_bugs";

const storage = Rx.Observable.from(loadJSON(STORAGE_KEY, []));

const request = credentials.filter(x => x).switchMap(function({email}) {
  return fetchAssignedBugs(email);
});

const assigned = storage
  .merge(request)
  .do((val) => saveJSON(STORAGE_KEY, val));

export default assigned;
