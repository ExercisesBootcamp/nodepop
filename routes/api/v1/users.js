/**
 * Created by juan_arillo on 30/4/16.
 *
 * Description: Users controller for API
 *
 * Version: v1
 */

'use strict';

// Loading express and router

let express = require('express');
let router = express.Router();

// Loading Mongoose and user´s model

let mongoose = require('mongoose');
let User = mongoose.model('User');

// Adding and saving user´s instance

router.post('/', function (req, res, next) {
    let user = new User(req.body);
    user.save(function (err, saved) {
        if(err){
            next(err);
            return;
        }

        res.json({success: true, saved: saved});
    });
});

// Exporting the router
module.exports = router;