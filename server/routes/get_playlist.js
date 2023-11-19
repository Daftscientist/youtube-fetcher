// --- External Imports ---
const express = require('express');
const axios = require('axios');

// --- Internal Imports ---
const { ytInitialData, playlistData } = require('../libs/parsing');

// --- Persistant Instances ---
const router = express.Router();

// --- Route ---
router.post('/', async (req, res, next) => {
    if (!req.body.url) {
        return res.status(400).send('No url provided');
    }

    if (!req.body.url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/)){
        return res.status(400).send('Invalid youtube playlist url');
    }

    try {
        const response = await axios.get(req.body.url);
        return res.json(playlistData(ytInitialData(response.data)));
    } catch (err) {
        next(err);
    }
});

// --- Exports ---
module.exports = router;
