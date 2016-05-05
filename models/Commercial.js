/**
 * Created by juan_arillo on 30/4/16.
 *
 * Mongoose Commercials Models
 *
 */

'use strict';

// Loading mongoose
let mongoose = require('mongoose');

// Designing Commercial Schema
let commercialSchema = mongoose.Schema({
    nombre: {type: String, index: true, required: true},
    venta: {type: Boolean, index: true, required: true},
    precio: {type: Number, index: true, required: true},
    foto: String,
    tags: [String]
});

// Making a static method for filtering data
commercialSchema.statics.list = function (filter, start, limit, sort, field, cb) {
    let query = Commercial.find(filter);
    query.skip(start);
    query.limit(limit);
    query.sort(sort);
    query.select(field);


    // Executing query - returning a promise
    return query.exec(cb);
};




// Assingning schema to model - Using var to use hoisting
var Commercial = mongoose.model('Commercial', commercialSchema);
