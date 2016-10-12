import "react-native";
import React from "react";
jest.mock("react-native-config", () => ({API_URL: "bugzilla.api"}));
import Login from "../../../views/login";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("renders correctly", () => {
 const tree = renderer.create(<Login />).toJSON();
 expect(tree).toMatchSnapshot();
});

it("renders errors correctly", () => {
 const tree = renderer.create(<Login error={{message: "What the hell"}} />).toJSON();
 expect(tree).toMatchSnapshot();
});
