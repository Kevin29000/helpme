const express = require('express');
const router = express.Router();
const ticketService = require('../services/ticketsServices');

router.get(["/", "/tickets"], async (req, res) => {
    const allTickets = await ticketService.getAllTickets();

    res.render("ticket-list", { tickets: allTickets });
});

router.get("/add-ticket", (req, res) => {
    const user = req.session.user;

    if(user) {
        res.render("add-ticket");
    } else {
        res.render("custom-errors", { notLoggedIn: true });
    }
});

router.post("/add-ticket", (req, res) => {
    const author = req.session.user.name;
    const title = req.body.title;
    const description = req.body.description;
    const authorId = req.session.user.id;

    ticketService.addTicket(author, title, description, authorId);

    res.redirect("/ticket");
});

router.get("/ticket-detail/:id", async (req, res) => {
    const ticket = await ticketService.findById(req.params.id);

    res.render("ticket-detail", { ticket: ticket });
});

router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const ticket = ticketService.deleteById(id);

    res.redirect("/ticket");
});

router.post("/:id/add-answer", (req, res) => {
    const ticketId = req.params.id;
    const answer = req.body.answer;
    const authorName = req.session.user.name;
    const authorId = req.session.user.id;

    ticketService.addAnswer(ticketId, answer, authorName, authorId);

    res.redirect("/ticket");
});

module.exports = router;