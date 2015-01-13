'use strict';

var cl = require('contralog')(module);
var Bluebird = require('bluebird');
var Assertions = require('../assertions');

var MongooseMgr = function (mongoDbUrl, mongoose) {

    cl.trace('MongooseMgr:', mongoDbUrl);
    Assertions.checkNotNull('mongoDbUrl', mongoDbUrl);

    mongoose = mongoose || require('mongoose');
    if(!mongoose.connectAsyc){
        Bluebird.promisifyAll(mongoose);
    }

    this.mongoDbUrl = mongoDbUrl;
    this.mongoose = mongoose;
    this.connection = mongoose.connection;
    this.models = {};
};

//
// We might have multiple connections in the future. For now, abstract away in wrapped method
//
MongooseMgr.prototype.closeConnectionsAsync = Bluebird.method(function(){
    // TODO: Move to async?
    // TODO: Move to connection.disconnect()?
    // TODO: Handle outstanding save calls
    // http://phaninder.com/posts/mongodbmongoose-connect-best-practices/
    // https://gist.github.com/pasupulaphani/9463004#file-mongoose_connet-js
    // http://stackoverflow.com/questions/19371821/do-i-need-to-manually-close-a-mongoose-connection
    // https://github.com/LearnBoost/mongoose/issues/878
    // https://github.com/LearnBoost/mongoose/issues/1807
    // http://stackoverflow.com/questions/8813838/properly-close-mongooses-connection-once-youre-done
    // http://stackoverflow.com/questions/15999999/mongoose-close-connection/16000730#16000730
    this.mongoose.connection.close();
    return this;
});


MongooseMgr.prototype.initializeAsync = Bluebird.method(function(){

    cl.trace('MongooseMgr.initializeAsync()');
    var self = this;

    // CONNECTION EVENTS
    // If the connection throws an error
    self.mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    self.mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    // but we need to handle this completely, not sure if this is ok. commenting out for now.
    //process.on('SIGINT', function () {
    //    self.mongoose.connection.close(function () {
    //        console.log('Mongoose default connection disconnected through app termination');
    //        process.exit(0);
    //    });
    //});

    cl.trace('Mongoose connectingAsync to: %s', this.mongoDbUrl);

    return self.mongoose.connectAsync(self.mongoDbUrl)
        .then(function () {
            self.connection = self.mongoose.connection;
            cl.trace('CONNECTED (default): %s:%s @%s [db: %s]', self.connection.host, self.connection.port, self.connection.user, self.connection.name);
        })
        .then(function () {
            cl.trace('Resolving models...');
            return Bluebird.resolve(Object.keys(self.models))
                .each(function(modelKey){
                    var model = self.models[modelKey];
                    cl.trace('Ensuring index for model: ', modelKey);
                    return model.ensureIndexesAsync();
                });
        })
        .then(function () {
            return self;
        })
        .catch(function(error){
            cl.error('initializeAsync error:', error);
            throw error;
        });
});

MongooseMgr.prototype.addModel = Bluebird.method(function(modelName, model){
    this.models[modelName] = model;
});

module.exports = MongooseMgr;