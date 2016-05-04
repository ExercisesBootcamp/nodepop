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
    nombre: {type: String, required: true},
    venta: {type: Boolean, required: true},
    precio: {type: Number, required: true},
    foto: {type: String, required: true},
    tags: [String]
});

// Making a static method
commercialSchema.statics.list = function (filter, start, limit, sort, cb) {
    let query = Commercial.find(filter);
    query.skip(start);
    query.limit(limit);
    query.sort(sort);

    // Executing query - returning a promise
    //console.log(query);
    return query.exec(cb);
};




// Assingning schema to model - Using var to use hoisting
var Commercial = mongoose.model('Commercial', commercialSchema);
