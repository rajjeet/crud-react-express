const express = require('express');
const router = express.Router();
const dalOptions = require('../dal/options')

const options = ['codes', 'professions', 'cities', 'branches'];

options.forEach(option => {
    router.get(`/${option}`, (req, res) => {
        let methodName = `get${option.charAt(0).toUpperCase()}${option.slice(1)}`;
        dalOptions[methodName]((err, options) => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify(options, null, 2));
        });
    });
});

module.exports = router;