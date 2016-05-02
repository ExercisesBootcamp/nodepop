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

// Assingning schema to model
mongoose.model('Commercial', commercialSchema);
