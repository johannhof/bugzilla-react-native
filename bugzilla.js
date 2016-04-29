/* @flow */
import Papa from "papaparse";
import apiKey from "./credentials";

export type Bug = {
  id: string
};

export type Flag = {
  bug: Bug
};

const USER_EMAIL = "jhofmann@mozilla.com";

const FIELDS = [
  "summary",
  "component",
  "id",
  "cc",
  "status",
  "product",
  "last_change_time",
  "assigned_to",
  "creator",
  "blocks",
  "depends_on"
].join(',');

const STATUS_OPEN = "bug_status=UNCONFIRMED&bug_status=NEW&bug_status=UNCONFIRMED&bug_status=NEW&bug_status=ASSIGNED&bug_status=REOPENED"

export function fetchUser(): Promise<Array<Bug>> {
  return apiKey.filter(x => x).take(1)
    .toPromise()
    .then(key => fetch(`https://bugzilla.mozilla.org/rest/user/${USER_EMAIL}?api_key=${key}`))
    .then(res => res.json())
    .then(({users}) => users[0]);
}

export function fetchBugs(bugs: Array<String>): Promise<Array<Bug>> {
  return fetch(`https://bugzilla.mozilla.org/rest/bug?include_fields=${FIELDS}&id=${bugs.join(',')}`)
    .then(res => res.json())
    .then(({bugs}) => bugs);
}

export function fetchAssignedBugs(user: ?string): Promise<Array<Bug>> {
  return fetch(`https://bugzilla.mozilla.org/rest/bug?include_fields=${FIELDS}&${STATUS_OPEN}&assigned_to=${USER_EMAIL}`)
    .then(res => res.json())
    .then(({bugs}) => bugs);
}

export function fetchCreatedBugs(user: ?string): Promise<Array<Bug>> {
  return fetch(`https://bugzilla.mozilla.org/rest/bug?include_fields=${FIELDS}&${STATUS_OPEN}&creator=${USER_EMAIL}`)
    .then(res => res.json())
    .then(({bugs}) => bugs);
}

export function fetchFlags(user: ?string): Promise<Array<Flag>> {
  return fetch(`https://bugzilla.mozilla.org/request.cgi?action=queue&do_union=1&group=type&requestee=${USER_EMAIL}&requester=${USER_EMAIL}&ctype=csv`)
    .then(res => res.text())
    .then(res => Papa.parse(res, {header: true}))
    .then(function({data}) {
      let ids: Array<String> = data.reduce(((arr, val) => [val["Bug ID"], ...arr]), []);
      return fetchBugs(ids).then(function(bugs) {
        // match bug and flag (ugh)
        data.forEach(function(val){
          val.bug = bugs.find((bug) => bug.id == val["Bug ID"]);
        });
        return data;
      });
    });
}

export function search(search: string): Promise<Array<Bug>> {
  return fetch(`https://bugzilla.mozilla.org/rest/bug?include_fields=${FIELDS}&quicksearch=${search}&limit=30`)
    .then(res => res.json())
    .then(({bugs}) => bugs);
}

export function searchURL(url: string): Promise<Array<Bug>> {
  return fetch(`https://bugzilla.mozilla.org/rest/bug?include_fields=${FIELDS}&${decodeURIComponent(url)}`)
    .then(res => res.json())
    .then(({bugs}) => bugs);
}
