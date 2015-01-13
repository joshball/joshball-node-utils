'use strict';
var Bluebird = require('bluebird');
var mongoose = require('mongoose');

if(!mongoose.connectAsyc){
    Bluebird.promisifyAll(mongoose);
}

module.exports = {
    Mongoose: mongoose,
    MongoDbCred: require('./MongoDbCred'),
    MongooseMgr: require('./MongooseMgr')
};