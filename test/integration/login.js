import test from "ava";
import wd from "wd";
import config from "./config";

let driver = wd.promiseRemote({
  host: "localhost",
  port: 4723,
});

test("should show an error message on wrong credentials", async t => {
  await driver.init(config);
  let username = await driver.elementById("Username");
  let password = await driver.elementById("API Key");
  let button = await driver.elementById("Submit");
  await username.setImmediateValue("test");
  await password.setImmediateValue("invalid");
  await button.click();

  let errorMessage = await driver.elementById("errorMessage");
  t.true(await errorMessage.isDisplayed());
  t.is(await errorMessage.text(), "There was an error logging you in, check if you provided the correct credentials.");
});
