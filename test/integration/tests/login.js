import test from "ava";
import wd from "wd";
import config from "../config";
import startServer from "../server";

let driver = wd.promiseRemote({
  host: "localhost",
  port: 4723,
});

test.before(async () => {
  startServer({});
  await driver.init(config);
});

test.afterEach.always(async () => {
  await driver.resetApp();
});

test.after.always(async () => {
  await driver.removeApp("org.reactjs.native.example.bugzilla");
  await driver.quit();
});

test.serial("should show an error message on wrong credentials", async t => {
  let username = await driver.elementById("Username");
  let password = await driver.elementById("API Key");
  let button = await driver.elementById("Submit");
  await username.setImmediateValue("test");
  await password.setImmediateValue("invalid");
  await button.click();

  let errorMessage = await driver.elementById("errorMessage");
  t.true(await errorMessage.isDisplayed());
  t.is(await errorMessage.text(), "The API key you specified is invalid. Please check that you typed it correctly.");
});
