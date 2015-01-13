'use strict';

var cl = require('contralog')(module);
var Hoek = require('hoek');
var ValidUrl = require('valid-url');
var Bluebird = require('bluebird');
var Mongoose = require('mongoose');
if(!Mongoose.connectAsyc){
    Bluebird.promisifyAll(Mongoose);
}


var Assertions = require('./assertions');
var Errors = require('./errors');
var Mongo = require('./mongo');
var String = require('./string');


module.exports = {
    assertions: Assertions,
    errors: Errors,
    mongo: Mongo,
    string: String,
    Hoek: Hoek,
    m: {
        Hoek: Hoek,
        Bluebird: Bluebird,
        CL: cl,
        Mongoose: Mongoose,
        ValidUrl: ValidUrl
    }
};