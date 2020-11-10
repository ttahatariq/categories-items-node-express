const categories = require("../routes/api/categories");

module.exports = function (app) {
  app.use("/api/categories/", categories);
};
