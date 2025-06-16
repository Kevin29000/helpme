const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db;

async function connectToMongo() {
    try {
        await client.connect();
        db = client.db('helpme');
        console.log("MongoDB connecté avec succès");
    } catch (err) {
        console.error("Erreur de connexion MongoDB : ", err);
        process.exit(1);
    }
}

function getDb() {
    if (!db) {
        throw new Error("La base de données n'est pas connectée");
    }

    return db;
}

module.exports = {
    connectToMongo,
    getDb
}