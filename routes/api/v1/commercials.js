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
    if (precio){
        let number = precio.search('-');
        if (number !== -1) {
            let valores = precio.split('-');
            let val = parseFloat(valores[0]);
            let val2 = parseFloat(valores[1]);
            criteria.val = val;
            criteria.val2 = val2;

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
            next(err);
            return;
        }

        res.json({success: true, saved: saved});
    });
});

// Exporting the router
module.exports = router;