import Rx from "rxjs/Rx";
import {AsyncStorage} from "react-native";

const storage = Rx.Observable
  .fromPromise(AsyncStorage.getItem("created_bugs"))
  .map(function(json) {
    if (json) {
      return JSON.parse(json);
    }

    return [];
  });

const request = Rx.Observable
  .fromPromise(
    fetch("https://bugzilla.mozilla.org/rest/bug?include_fields=summary,component,id,cc,status,product,last_change_time,assigned_to,creator,blocks,depends_on&bug_status=UNCONFIRMED&bug_status=NEW&bug_status=UNCONFIRMED&bug_status=NEW&bug_status=ASSIGNED&bug_status=REOPENED&creator=jhofmann@mozilla.com")
    )
  .switchMap(res => res.json())
  .map(({bugs}) => bugs);

const created = storage
  .merge(request)
  .do(function(list) {
    if (list) {
      AsyncStorage.setItem("created_bugs", JSON.stringify(list));
    } else {
      AsyncStorage.removeItem("created_bugs");
    }
  });

export default created;
