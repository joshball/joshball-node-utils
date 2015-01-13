'use strict';

var cl = require('contralog')(module);
var ValidUrl = require('valid-url');
var Bluebird = require('bluebird');
var Mongoose = require('mongoose');
if(!Mongoose.connectAsyc){
    Bluebird.promisifyAll(Mongoose);
}


var Assertions = require('./assertions');
var Errors = require('./errors');
var Mongo = require('./mongo');


module.exports = {
    assertions: Assertions,
    errors: Errors,
    mongo: Mongo,
    m: {
        Bluebird: Bluebird,
        CL: cl,
        Mongoose: Mongoose,
        ValidUrl: ValidUrl
    }
};