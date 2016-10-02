"use strict";

let jsonServer = require("json-server");

//const USERNAME = "bugzilla@example.com";
const API_KEY = "valid_api_key";

module.exports = function startServer(db) {
  let server = jsonServer.create();
  let router = jsonServer.router(db);
  let middlewares = jsonServer.defaults();

  // Set default middlewares (logger, static, cors and no-cache)
  server.use(middlewares);

  server.use(function (req, res, next) {
    if (req.query.api_key !== API_KEY) {
      return res.status(400).json({
       "code" : 306,
       "documentation" : "http://www.bugzilla.org/docs/tip/en/html/api/",
       "error" : true,
       "message" : "The API key you specified is invalid. Please check that you typed it correctly.",
      });
    }
    next();
  });

  server.use("/api", router);

  // Use default router
  server.use(router);
  server.listen(5000, function () {
    console.log("JSON Server is running");
  });
};
