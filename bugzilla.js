/* @flow */
import Papa from "papaparse";
import {PropTypes} from "react";

export type Bug = {
  id: string
};

export type Flag = {
  bug: Bug
};

export type User = {
  name: string,
  email: string,
  real_name: string,
};

export const UserType = {
  email: PropTypes.string.isRequired,
  real_name: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const BASE_URL = "https://bugzilla.mozilla.org";

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
  "depends_on",
].join(",");

const STATUS_OPEN = "bug_status=UNCONFIRMED&bug_status=NEW&bug_status=UNCONFIRMED&bug_status=NEW&bug_status=ASSIGNED&bug_status=REOPENED";

let key: ?string = null;
let email: ?string = null;

export function setCredentials(_key: ?string, _email: ?string) {
  key = _key;
  email = _email;
}

export function fetchUser(): Promise<User> {
  return fetch(`${BASE_URL}/rest/user/${email}?api_key=${key}`)
    .then(res => res.json())
    .then(({users}) => users[0]);
}

export function fetchBugs(bugs: Array<String>): Promise<Array<Bug>> {
  return fetch(`${BASE_URL}/rest/bug?include_fields=${FIELDS}&id=${bugs.join(",")}`)
    .then(res => res.json())
    .then(({bugs}) => bugs);
}

export function fetchAssignedBugs(user: string): Promise<Array<Bug>> {
  return fetch(`${BASE_URL}/rest/bug?include_fields=${FIELDS}&${STATUS_OPEN}&assigned_to=${user}&api_key=${key}`)
    .then(res => res.json())
    .then(({bugs}) => bugs);
}

export function fetchCreatedBugs(user: string): Promise<Array<Bug>> {
  return fetch(`${BASE_URL}/rest/bug?include_fields=${FIELDS}&${STATUS_OPEN}&creator=${user}&api_key=${key}`)
    .then(res => res.json())
    .then(({bugs}) => bugs);
}

export function fetchFlags(user: string): Promise<Array<Flag>> {
  return fetch(`${BASE_URL}/request.cgi?action=queue&do_union=1&group=type&requestee=${user}&requester=${user}&ctype=csv`)
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
