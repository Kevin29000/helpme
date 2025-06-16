const User = require('../models/User');
const { getDb } = require('../database/db');

async function findByUsernameAndPassword(username, password) {
    const db = getDb();

    const user = await db.collection('users').findOne({ username, password });

    return user;
}

async function findByUsername(username) {
    const db = getDb();

    const user = await db.collection('users').findOne({ username });

    return user;
}

async function findById(id) {
    const db = getDb();

    const user = await db.collection('users').findOne({ id });

    return user;
}

async function createUser(username, name, password) {
    const db = getDb();

    const user = new User(username, name, password);

    await db.collection('users').insertOne(user);
}

async function deleteUser(id) {
    const db = getDb();

    await db.collection('users').deleteOne({ id });
}

module.exports = {
    findByUsernameAndPassword,
    findByUsername,
    findById,
    createUser,
    deleteUser
}