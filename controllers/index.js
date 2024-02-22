const { client } = require('../db');
const { fetchAll, fetchOneDoc, insertSneaker, updateSneaker, deleteSneaker } = require('../models/index');


const homeRoute = (req, res) => {
    res.send('Welcome, my friend...');
};

const testRoute = (req, res) => {
    res.send('Testing another route.');
};


/**
 * 
 * Google OAuth routes
 */

// Middleware used in protected routes to check if the user has been authenticated
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
};

const home = (req, res) => {
    res.send("Home Page");
};

const failedRoute = (req, res) => {
    res.send('Failed');
};

const successRoute = (req, res) => {
    console.log('You are logged in!');
    res.send(`Welcome ${req.user.displayName}`);
};

const googleCallbackRoute = (req, res) => {
    res.redirect('/success');
};

const logoutRoute = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(`Error while destroying session: ${err}`);
        } else {
            req.logout(() => {
                console.log('You are logged out!');
                res.redirect('/home');
            });
        }
    });
};


/**
 * 
 * CRUD Controllers 
 * 
 */
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
    const id = req.params.id
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    if (!req.body.Name) {
        return res.status(400).json({
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
            return res.status(200).json({ message: "Sneaker was updated Successfully." })
        } else {
            return res.status(400).json({ error: "Something went wrong :/" })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error.'
        });
    }
};

const deleteOneRoute = async (req, res) => {
    const id = req.params.id
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    try {
        const result = await deleteSneaker(id);

        if (result.deletedCount === 1) {
            return res.status(200).json({ message: "Doc was deleted successfully." })
        } else {
            return res.status(400).json({ error: "Something went wrong, sorry." })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
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
    isLoggedIn,
    home,
    failedRoute,
    successRoute,
    googleCallbackRoute,
    logoutRoute,
};