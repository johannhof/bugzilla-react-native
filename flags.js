import Rx from "rxjs/Rx";
import {AsyncStorage} from "react-native";
import Papa from "papaparse";

const storage = Rx.Observable
  .fromPromise(AsyncStorage.getItem("flags"))
  .map(function(json) {
    if (json) {
      return JSON.parse(json);
    }

    return [];
  });

const request = Rx.Observable
  .fromPromise(
    fetch("https://bugzilla.mozilla.org/request.cgi?action=queue&do_union=1&group=type&requestee=jhofmann%40mozilla.com&requester=jhofmann%40mozilla.com&ctype=csv")
    )
  .flatMap(res => res.text())
  // parse csv
  .map(res => Papa.parse(res, {header: true}))
  // fetch corresponding bugs
  .flatMap(({data}) => {
    let ids = data.reduce(((arr, val) => [val["Bug ID"], ...arr]), []);
    return Rx.Observable
    .fromPromise(fetch(`https://bugzilla.mozilla.org/rest/bug?id=${ids.join(',')}`).then(res => res.json())).map(function({bugs}){
      // match bug and flag (ugh)
      data.forEach(function(val){
        val.bug = bugs.find((bug) => bug.id == val["Bug ID"]);
      });
      return data;
    });
  });

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
