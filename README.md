# bugzilla-react-native [![](https://travis-ci.org/johannhof/bugzilla-react-native.svg?branch=master)](https://travis-ci.org/johannhof/bugzilla-react-native)
A Mobile Bugzilla Tracker

## Tests

Integration tests are run using Appium and AVA.

You need to build the app for release to load it during testing:

```
npm run build-ios
```

Start appium

```
npm run appium
```

In another window, run AVA

```
npm run integration
```

