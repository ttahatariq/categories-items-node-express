const dashboard = require("../routes/admin/dashboard");
const categoories = require("../routes/admin/categories");
const items = require("../routes/admin/items");

module.exports = function (app) {
  app.use("/admin/items", items);
  app.use("/admin/categories", categoories);
  app.use("/admin/", dashboard);
};
