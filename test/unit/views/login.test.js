global.Promise = require.requireActual("promise");
import "react-native";
import React from "react";
jest.mock("react-native-config", () => ({API_URL: "bugzilla.api"}));
jest.mock("../../../bugzilla");
jest.mock("../../../emitter", () => ({events: {trigger: jest.fn()}}));
import Login from "../../../views/login";
import {fetchUser} from "../../../bugzilla";
import {events} from "../../../emitter";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("renders correctly", () => {
  let tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders errors correctly", () => {
  let tree = renderer.create(<Login error={{message: "What the hell"}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// TODO: Throws an unclear error
xit("calls fetchUser with correct values on submit", async () => {
  let component = renderer.create(<Login />);
  let tree = component.toJSON();
  let usernameInput = global.getElementByTestID(tree, "usernameInput");
  let apiKeyInput = global.getElementByTestID(tree, "apiKeyInput");
  usernameInput.props.onChangeText("test@email.com");
  apiKeyInput.props.onChangeText("test_key");
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  await apiKeyInput.props.onSubmitEditing();
  expect(fetchUser.mock.calls.length).toBe(1);
  expect(fetchUser.mock.calls[0]).toEqual(["test@email.com", "test_key"]);
});

it("triggers an event on successful login", async () => {
  const tree = renderer.create(<Login />).toJSON();
  let apiKeyInput = global.getElementByTestID(tree, "apiKeyInput");
  await apiKeyInput.props.onSubmitEditing();
  expect(fetchUser.mock.calls.length).toBe(1);
  expect(events.trigger.mock.calls.length).toBe(1);
  expect(events.trigger.mock.calls[0]).toEqual(["login", {
    // TODO: can not set input, see above
    email: "",
    key: "",
  }]);
});

it("sets error state on unsuccessful login", async () => {
  fetchUser.mockReturnValueOnce(Promise.reject({message: "What"}));
  let component = renderer.create(<Login />);
  let tree = component.toJSON();
  let apiKeyInput = global.getElementByTestID(tree, "apiKeyInput");
  await apiKeyInput.props.onSubmitEditing();
  expect(fetchUser.mock.calls.length).toBe(1);
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

