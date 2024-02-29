const e = require('express');
const { client } = require('../db');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const database = client.db(process.env.MONGO_DB);
const collection = database.collection(process.env.MONGO_COLLECTION);
const userCollection = database.collection(process.env.MONGO_USERS_COLLECTION);

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


/**
 * 
 * Users CRUD Functions
 */

const fetchOneUser = async (id) => {
    try {
        await client.connect();

        const objectId = new ObjectId(id);
        const result = await userCollection.findOne({_id: objectId})

        if (!result) {
            throw new Error('Document not found');
        }

        return result;

    } catch (error) {
        console.error('There was an error fecthing the User: ', error);

    }
};

const fetchAllUsers = async () => {
    try{
        await client.connect();

        const result = await userCollection.find({}).toArray();
    
        if (!result) {
            throw new Error('No documents found.');
        }

        return result;
    } catch (error) {
        console.error('There was an error fetching docs: ', error);
    }
};

const insertUser = async (data) => {
    try {
        await client.connect();

        const result = await userCollection.insertOne(data);

        if (!result) {
            throw new Error('No document was inserted');
        }

        return result;
    } catch (error) {
        console.error('There was an error inserting the data', error);
    }
};

const updateUser = async (data) => {
    const { email, name, picture, sub } = data;
   
    try {
        await client.connect();

        const result = await userCollection.updateOne(
            {
                Email: email
            },
            {
                $set: {
                    Email: email,
                    Name: name,
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

const deleteUser = async (id) => {
    try {
        const objectId = new ObjectId(id);

        await client.connect();

        const result = await userCollection.deleteOne({ _id: objectId });

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
    fetchOneUser,
    fetchAllUsers,
    insertUser,
    updateUser,
    deleteUser,
};