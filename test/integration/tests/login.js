import test from "ava";
import wd from "wd";
import config from "../config";
import {startServer} from "../server";
import {login, logout} from "../common";

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
  let username = await driver.elementById("usernameInput");
  let password = await driver.elementById("apiKeyInput");
  let button = await driver.elementById("submitButton");
  await username.setImmediateValue("test");
  await password.setImmediateValue("invalid");
  await button.click();

  let errorMessage = await driver.waitForElementById("errorMessage");
  t.true(await errorMessage.isDisplayed());
  t.is(await errorMessage.text(), "The API key you specified is invalid. Please check that you typed it correctly.");
});

test.serial("should show an error message on network error", async t => {
  let username = await driver.elementById("usernameInput");
  let password = await driver.elementById("apiKeyInput");
  let button = await driver.elementById("submitButton");
  await username.setImmediateValue("bugzilla@example.com");
  await password.setImmediateValue("valid_api_key");
  await button.click();

  let errorMessage = await driver.waitForElementById("errorMessage");
  t.true(await errorMessage.isDisplayed());
  t.is(await errorMessage.text(), "Network request failed");
});

test.serial("should login/logout", async t => {
  server = await startServer();
  await login(driver, server, t);
  await logout(driver, server, t);
});

