var express = require("express");
var router = express.Router();
var Category = require("../../models/CategoryModel");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let categories = await Category.find();
  res.render("admin/categories", { categories });
});
router.post("/", async function (req, res, next) {
  let category = new Category();
  category.title = req.body.title;
  await category.save();
  res.redirect("/admin/categories");
});
router.get("/add", async function (req, res, next) {
  res.render("admin/categories/form");
});
router.get("/delete/:id", async function (req, res, next) {
  await Category.deleteMany({ _id: req.params.id });
  res.redirect("/admin/categories");
});
router.get("/edit/:id", async function (req, res, next) {
  let category = await Category.findById(req.params.id);
  res.render("admin/categories/form", { category });
});
router.post("/edit/:id", async function (req, res, next) {
  let category = await Category.findById(req.params.id);
  category.title = req.body.title;
  await category.save();
  res.redirect("/admin/categories");
});

module.exports = router;
