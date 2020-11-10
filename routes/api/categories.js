var express = require("express");
var router = express.Router();
var Category = require("../../models/CategoryModel");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let categories = await Category.find();
  res.send(categories);
});

module.exports = router;
