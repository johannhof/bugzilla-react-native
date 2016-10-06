import express from "express";
import morgan from "morgan";

const API_KEY = "valid_api_key";

export function startServer() {
  return new Promise(function(resolve) {
    let app = express();

    app.use(morgan("dev"));

    app.use(function (req, res, next) {
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

    app.server = app.listen(5000, function () {
      console.log("Test server is running on port 5000");
      resolve(app);
    });
  });
}
