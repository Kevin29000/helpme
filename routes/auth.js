const express = require('express');
const router = express.Router();
const userService = require('../services/user-service');

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.findByUsernameAndPassword(username, password);
    const error = "Identifiants de connexion invalides"

    if (!user) return res.render('custom-errors', { errorLogin: error });

    req.session.user = user;
    res.redirect("/ticket");
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/ticket");
    });
});

module.exports = router;