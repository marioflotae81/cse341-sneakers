const e = require('express');
const { client } = require('../db');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const database = client.db(process.env.MONGO_DB);
const collection = database.collection(process.env.MONGO_COLLECTION);
const sneakerCollection = database.collection(process.env.MONGO_USERS_COLLECTION);

const fetchOneDoc = async (id) => {
    try {
        await client.connect();

        const objectId = new ObjectId(id);
        const result = await collection.findOne({_id: objectId})

        if (!result) {
            throw new Error('Document not found');
        }

        return result;

    } catch (error) {
        console.error('There was an error fecthing the doc: ', error);

    }
};

const fetchAll = async () => {
    try{
        await client.connect();

        const result = await collection.find({}).toArray();
    
        if (!result) {
            throw new Error('No documents found.');
        }

        return result;
    } catch (error) {
        console.error('There was an error fetching docs: ', error);
    }
};

const insertSneaker = async (data) => {
    try {
        await client.connect();

        const result = await collection.insertOne(data);

        if (!result) {
            throw new Error('No document was inserted');
        }

        return result;
    } catch (error) {
        console.error('There was an error inserting the data', error);
    }
};

const updateSneaker = async (id, data) => {
    try {
        const objectId = new ObjectId(id);
        await client.connect();

        const result = await collection.updateOne({
            _id: objectId
        }, {
            $set: data
        });

        return result;
    } catch (error) {
        console.error(error);
    }
};

const deleteSneaker = async (id) => {
    try {
        const objectId = new ObjectId(id);

        await client.connect();

        const result = await collection.deleteOne({ _id: objectId });

        return result;
    } catch (error) {
        console.error(error);
    }
};

const updateUser = async (data) => {
    const { sub, name, picture, email } = data;
    console.log(sub, name, picture, email)
    try {
        await client.connect();

        const result = await sneakerCollection.updateOne(
            {
                Email: email
            },
            {
                $set: {
                    Name: name,
                    Email: email,
                    Picture: picture,
                    Sub: sub
                }
            },
            { upsert: true }
        );

        if (!result) {
            throw new Error('There was a problem.')
        }

        return result;

    } catch (error) {
        console.error(error);
    }

};

module.exports = {
    fetchOneDoc,
    fetchAll,
    insertSneaker,
    updateSneaker,
    deleteSneaker,
    updateUser,
};