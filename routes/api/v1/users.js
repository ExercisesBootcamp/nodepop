/**
 * Created by juan_arillo on 30/4/16.
 *
 * Description: Users controller for API
 *
 * Version: v1
 */

'use strict';

// Loading auth library
let jwt = require('jsonwebtoken');
let config = require('../../../lib/local_config');

// Loading express and router

let express = require('express');
let router = express.Router();

// Loading Mongoose and user´s model

let mongoose = require('mongoose');
let User = mongoose.model('User');

// Loading error handler library
let errors = require('../../../lib/errorHandler');

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

// JWT Authentication

// Authentication
router.post('/authenticate', function (req, res) {
    let email = req.body.email;
    let pass = req.body.key;


    User.findOne({email: email}).exec(function(err, user){
        if(err){
            errors('Internal server error', res.status(500));
            return;
        }
        if(!email){
            errors('Authentication failed. User not found', res.status(401));
            return;
        }

        if(user.key !== pass){
            errors('Authentication failed. Invaid password', res.status(401));
            return;
        }

        let token = jwt.sign({id: user._id}, config.jwt.secret, {
            expiresIn: "2 days"
        });

        res.json({success: true, token: token});
    });
});


// Exporting the router
module.exports = router;