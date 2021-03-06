export async function login(driver, server, t) {
  let userEndpointCalled = 0;
  let bugEndpointCalled = 0;
  server.get("/rest/user/:email", function(req, res) {
    userEndpointCalled++;
    t.is(req.params.email, "bugzilla@example.com");
    res.json({
      users: [{
       "can_login" : true,
       "email" : "bugzilla@example.com",
       "groups" : [
          {
             "description" : "Can confirm a bug.",
             "id" : 7,
             "name" : "canconfirm",
          },
          {
             "description" : "Can edit all aspects of any bug.",
             "id" : 6,
             "name" : "editbugs",
          },
       ],
       "id" : 65095,
       "name" : "bugzilla@example.com",
       "real_name" : "Example Tester",
       "saved_reports" : [],
       "saved_searches" : [],
      }],
    });
  });

  server.get("/rest/bug", function(req, res) {
    bugEndpointCalled++;
    t.is(req.query.assigned_to, "bugzilla@example.com");
    t.is(req.query.api_key, "valid_api_key");
    res.json({
      bugs: [],
    });
  });

  server.use("*", () => t.fail("Unexpected API call"));

  let username = await driver.elementById("usernameInput");
  let password = await driver.elementById("apiKeyInput");
  let button = await driver.elementById("submitButton");
  await username.setImmediateValue("bugzilla@example.com");
  await password.setImmediateValue("valid_api_key");
  await button.click();

  await driver.waitForElementById("menuButton");
  t.is(userEndpointCalled, 2);
  t.is(bugEndpointCalled, 1);

  server._router.stack.splice(-3, 3);
}

export async function logout(driver, server, t) {
  let menuButton = await driver.elementById("menuButton");
  menuButton.click();

  let settingsButton = await driver.waitForElementById("settingsButton");
  t.true(await settingsButton.isDisplayed());
  settingsButton.click();

  let logoutButton = await driver.waitForElementById("logoutButton");
  logoutButton.click();

  let username = await driver.waitForElementById("Username");
  t.true(await username.isDisplayed());
}
