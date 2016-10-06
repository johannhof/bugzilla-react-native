import test from "ava";
import wd from "wd";
import config from "../config";
import {startServer} from "../server";
import {login} from "../common";

let driver = wd.promiseRemote({
  host: "localhost",
  port: 4723,
});

let server;

test.before(async () => {
  await driver.init(config);
});

test.afterEach.always(async () => {
  server.server && server.server.close();
  await driver.resetApp();
});

test.after.always(async () => {
  await driver.removeApp("org.reactjs.native.example.bugzilla");
  await driver.quit();
});

test.serial("should show an error message on wrong credentials", async t => {
  server = await startServer();
  let username = await driver.elementById("Username");
  let password = await driver.elementById("API Key");
  let button = await driver.elementById("Submit");
  await username.setImmediateValue("test");
  await password.setImmediateValue("invalid");
  await button.click();

  let errorMessage = await driver.waitForElementById("errorMessage");
  t.true(await errorMessage.isDisplayed());
  t.is(await errorMessage.text(), "The API key you specified is invalid. Please check that you typed it correctly.");
});

test.serial("should login", async t => {
  server = await startServer();
  await login(driver, server, t);
});

