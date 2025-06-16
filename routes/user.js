var express = require('express');
var router = express.Router();
const userService = require('../services/user-service');

router.get("/create-user", (req, res) => {
  res.render("create-user");
});

router.post("/create-user", (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;

  userService.createUser(username, name, password);

  res.redirect("/auth/login");
});

router.get("/delete/:id", async (req, res) => {
  await userService.deleteUser(req.params.id);

  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
  
});

module.exports = router;
