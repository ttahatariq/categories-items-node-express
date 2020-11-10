var express = require("express");
var router = express.Router();
var Item = require("../../models/ItemModel");
var Category = require("../../models/CategoryModel");
var faker = require("faker");
/* GET home page. */
router.get("/faker", async function (req, res, next) {
  await Category.deleteMany({});
  await Item.deleteMany({});
  faker.seed(123);
  let categories = [];
  for (let j = 0; j < 30; j++) {
    categories.push({
      title: faker.lorem.words(2),
    });
  }

  Category.insertMany(categories)
    .then(async function () {
      categories = await Category.find().lean();
      let items = [];
      for (let i = 0; i < 400; i++) {
        items.push({
          title: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          category: categories[Math.floor(Math.random() * categories.length)],
        });
      }
      Item.insertMany(items)
        .then(async function () {
          items = await Item.find();
          return res.redirect("/admin/categories");
        })
        .catch(function () {
          return res.send("Error in faking Items");
        });
    })
    .catch(function () {
      return res.send("Error in faking Categories");
    });
});
router.get("/:page?", async function (req, res, next) {
  let page = req.params.page ? Number(req.params.page) : 1;
  let limit = 15;
  let items = await Item.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .populate("category");
  let total = await Item.countDocuments();
  let totalPages = Math.ceil(total / limit);
  res.render("admin/items", { items, page, totalPages });
});
router.post("/", async function (req, res, next) {
  let item = new Item();
  item.title = req.body.title;
  item.category = req.body.category;
  item.description = req.body.description;
  await item.save();
  res.redirect("/admin/items");
});
router.get("/add", async function (req, res, next) {
  let categories = await Category.find();
  res.render("admin/items/form", { categories });
});
router.get("/delete/:id", async function (req, res, next) {
  await Item.deleteMany({ _id: req.params.id });
  res.redirect("/admin/items");
});
router.get("/edit/:id", async function (req, res, next) {
  let item = await Item.findById(req.params.id);
  let categories = await Category.find();
  res.render("admin/items/form", { item, categories });
});
router.post("/edit/:id", async function (req, res, next) {
  let item = await Item.findById(req.params.id);
  item.title = req.body.title;
  item.category = req.body.category;
  item.description = req.body.description;
  await item.save();
  res.redirect("/admin/items");
});

module.exports = router;
