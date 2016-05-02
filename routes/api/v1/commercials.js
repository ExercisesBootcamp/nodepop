/**
 * Created by juan_arillo on 30/4/16.
 *
 * Description: Commercials controller for API
 *
 * Version: v1
 *
 */

'use strict';

// Loading express and router

let express = require('express');
let router = express.Router();

// Loading Mongoose and Commercial´s model

let mongoose = require('mongoose');
let Commercial = mongoose.model('Commercial');

// Loading errors handler library
let errors = require('../../../lib/errorHandler');

// Returning data

router.get('/', function (req, res) {
    Commercial.find().exec(function (err, rows, next) {
        if(err){
            errors('Not found', res.status(404));
            return;
        }

        res.json({success: true, rows: rows});
    })
});

// Adding and saving commercial´s instance

router.post('/', function (req, res, next) {
    let commercial = new Commercial(req.body);
    commercial.save(function (err, saved) {
        if(err){
            errors('Validation error. One or more required fields haven´t been inserted', res.status(500));
            return;
        }

        res.json({success: true, saved: saved});
    });
});

// Exporting the router
module.exports = router;