var express = require("express");
var router = express.Router();

/* GET home page. */
//selects a view and pass avariable to view
router.get("/", function (req, res, next) {
  res.render("home", { title: "Express" });
});

module.exports = router;
