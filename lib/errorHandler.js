/**
 * Created by juan_arillo on 2/5/16.
 *
 * Description: Module for handler errors from controller files
 *
 */

'use strict';

function errorHandler (err, res){
    res.json({success: false, error: err});
}

module.exports = errorHandler;