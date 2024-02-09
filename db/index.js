const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB...')
    }catch (error) {
        console.error('Error connecting to DB: ', error);
    } finally {
        client.close();
    } 
};

module.exports = {
    client,
    connectToMongoDB
};

