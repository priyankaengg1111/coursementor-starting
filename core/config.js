'use strict';
module.exports.PORT = process.env.PORT || 3000;
module.exports.MONGO_URI = process.env.MONGO_URI || "";

module.exports.ACCESS_TOKEN = {
  validity: "4h",
  secret: process.env.AUTH_TOKEN_SECRET || "@demoKEY",
};

module.exports.REFRESH_TOKEN = {
  validity: "10d",
  secret: process.env.REFRESH_TOKEN_SECRET || "@DEmOKeY",
};

module.exports.APP_BASE_URL = process.env.APP_BASE_URL || "http://localhost:" +  process.env.PORT || 3000;
