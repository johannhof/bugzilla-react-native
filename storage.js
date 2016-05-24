/* @flow */
import {AsyncStorage} from "react-native";

export function loadJSON(key: string, fallback): Promise {
  return AsyncStorage.getItem(key)
    .then(function(json: ?string) {
      if (json) {
        return JSON.parse(json);
      }
      return fallback;
    });
}

export function saveJSON(key: string, value) {
  if (value) {
    AsyncStorage.setItem(key, JSON.stringify(value));
  } else {
    AsyncStorage.removeItem(key);
  }
}
