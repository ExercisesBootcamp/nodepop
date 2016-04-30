/**
 * Created by juan_arillo on 30/4/16.
 *
 * Description: Module for manage Mongoose connection´s to Database
 *
 */

'use strict';

// Create connection variables
var mongoose = require('mongoose');
var connection = mongoose.connection;

// Connection events handlers

connection.on('error', function () {
    console.log('Connection error!');
});

connection.once('open', function () {
    console.log('Connected to database!');
})

// Database connection
mongoose.connect('mongodb://localhost:27017/nodepop');