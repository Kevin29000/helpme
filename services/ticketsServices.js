const Ticket = require('../models/Ticket');
const Answer = require('../models/Answer');
const { getDb } = require('../database/db');

async function addTicket(author, title, description, authorId) {
    const db = getDb();

    const ticket = new Ticket(author, title, description, authorId);

    await db.collection('tickets').insertOne(ticket);
}

async function updateTicket(id, updates) {
    const db = getDb();

    await db.collection('tickets').updateOne({ id }, { $set: updates });
}

async function getAllTickets() {
    const db = getDb();

    return await db.collection('tickets').find().toArray();
}

async function findById(id) {
    const db = getDb();

    const ticket = await db.collection('tickets').findOne({ id });

    return ticket;
}

async function deleteById(id) {
    const db = getDb();

    await db.collection('tickets').deleteOne({ id });
}

async function addAnswer(ticketId, answer, authorName, authorId) {
    const db = getDb();

    const ans = new Answer(answer, authorName, authorId);

    await db.collection('tickets').updateOne(
        { id: ticketId},
        { $push : { answers: ans } }
    );
}

module.exports = {
    addTicket,
    updateTicket,
    getAllTickets,
    findById,
    deleteById,
    addAnswer
};
