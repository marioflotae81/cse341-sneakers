const { client } = require('../db');
const { fetchAll, fetchOneDoc, insertSneaker, updateSneaker, deleteSneaker } = require('../models/index');


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

const updateRoute = async (req, res) => {
    if (!req.params.id) {
        res.status(404).json({
            error: 'Resource not found. ID is missing.'
        });
    }

    if (!req.body) {
        res.status(400).json({
            error: 'Bad Request. No data provided.'
        })
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
        const result = await updateSneaker(req.params.id, sneaker);

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Sneaker was updated Successfully." })
        } else {
            res.status(400).json({ error: "Something went wrong :/" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error.'
        });
    }
};

const deleteOneRoute = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            error: 'No valid ID.'
        });
    }

    try {
        const result = await deleteSneaker(id);

        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Doc was deleted successfully." })
        } else {
            res.status(400).json({ error: "Something went wrong, sorry." })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error.'
        });
    }
};


module.exports = {
    homeRoute,
    testRoute,
    getAllRoute,
    getOneRoute,
    postRoute,
    updateRoute,
    deleteOneRoute,
};