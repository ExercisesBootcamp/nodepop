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
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// Assingning schema to model
mongoose.model('Commercial', commercialSchema);
