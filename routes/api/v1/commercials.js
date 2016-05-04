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
    let name = req.query.nombre;
    let venta = req.query.venta;
    let tags = req.query.tags;
    let precio = req.query.precio;
    let start = parseInt(req.query.start) || 0;
    let limit = parseInt(req.query.limit) || null;
    let sort = req.query.sort || null;

    let criteria = {};

    if(typeof name !== 'undefined'){
        criteria.nombre = name;
    }
    if(typeof venta !== 'undefined'){
        criteria.venta = venta;
    }
    if(typeof tags !== 'undefined'){
        criteria.tags = tags;
    }

    // Controlling field nombre search with the string
    // passed in the request
    if (name){

        let $regex = new RegExp('^' + name, 'i');
        criteria.nombre = {$regex};

    }

    // Controlling tags search
    if (tags && tags.length > 0){
        let $all = tags;
        criteria.tags = {$all};
    }


    // Controlling if precio data is a range
    // If it´s, split the values and pass the filter as
    // variables
    if (precio){
        let number = precio.search('-');
        if (number !== -1) {
            let valores = precio.split('-');
            let $gte = parseFloat(valores[0]);
            let $lte = parseFloat(valores[1]);

            // Controling if the range has a max
            // and a min or only one of them

            if (isNaN($lte)){
                criteria.precio = {$gte};
            } else if (isNaN($gte)){
                criteria.precio = {$lte};
            } else {
                criteria.precio = {$gte,$lte};
            }

        } else {
            criteria.precio = parseFloat(precio);
        }
    }

    Commercial.list(criteria, start, limit, sort, function(err, rows){
        if(err){
            // Returning understable error
            return res.json({success:false, error: err});
        }
        res.json({success: true, rows: rows});
    });

});

// Adding and saving commercial´s instance

router.post('/', function (req, res, next) {
    let commercial = new Commercial(req.body);

    // Controlling fields validation
    try {
        var errors = commercial.validateSync();
    } catch (err){
       console.log('errors', error);
        next(err);
    }

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
