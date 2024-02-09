const { client } = require('../db');
const { fetchAll, fetchOneDoc, insertSneaker } = require('../models/index');


const homeRoute = (req, res) => {
    res.send('Welcome, my friend...');
};

const testRoute = (req, res) => {
    res.send('Testing another route.');
};

const getAllRoute = async (req, res) => {
    try {
        const data = await fetchAll();

        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || 'There was an error fetching Sneakers.'
        })
    } finally {
        client.close();
    }
};

const getOneRoute = async (req, res) => {
    try {
        const data = await fetchOneDoc(req.params.id);

        if (!data) {
            res.status(404).send({
                message: `Sorry, the sneaker with id: ${req.params.id} was not found.`
            })
        } else {
            res.send(data);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || `There was an error fetching Sneaker with id: ${req.params.id}.`
        })
    } finally{ 
        client.close();
    }
};

const postRoute = async (req, res) => {
    // Validate data
    if(!req.body.Name) {
        res.status(400).send({ message: 'Content can\'t be empty.' });
    }

    // Create Sneaker Object
    const sneaker = {
        Name: req.body.Name,
        Brand: req.body.Brand,
        Color: req.body.Color,
        PictureURL: req.body.PictureURL,
        Size: req.body.Size,
        Collab: req.body.Collab,
        Description: req.body.Description
    };

    try {
        const result = await insertSneaker(sneaker);

        if (result) {
            res.status(201).json({ message: `New Sneaker Inserted Id: ${(await result).insertedId} `})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error."
        })
    }
};

const updateRoute = (req, res) => {
    res.send('Updating this guy here: ' + req.params.id);
};

const deleteOneRoute = (req, res) => {
    res.send('Bye, bye doc: ' + req.params.id);
};

const deleteAllRoute = (req, res) => {
    res.send('So long suckers...');
};

module.exports = {
    homeRoute,
    testRoute,
    getAllRoute,
    getOneRoute,
    postRoute,
    updateRoute,
    deleteOneRoute,
    deleteAllRoute
};