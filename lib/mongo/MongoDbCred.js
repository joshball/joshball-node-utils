'use strict';

var MongoDbCred = function (host, port, database, username, password) {
    this.host = host || 'localhost';
    this.port = port || 27017;
    this.database = database || 'test';
    this.username = username;
    this.password = password;

    if (isNaN(parseInt(this.port))) {
        throw new Error('MongoDbUrl: port is invalid (not a number): ', this.port);
    }

    if (this.username && !this.password) {
        throw new Error('MongoDbUrl: username is specified but missing password!');
    }

    if (this.password && !this.username) {
        throw new Error('MongoDbUrl: password is specified but missing username!');
    }

    this.url = MongoDbCred.createMongoDbUrl(this.host, this.port, this.database, this.username, this.password);
};

MongoDbCred.createMongoDbUrl = function (host, port, database, username, password) {
    var usernamePassword = username ? username + ':' + password + '@' : '';
    return 'mongodb://' + usernamePassword + host + ':' + port + '/' + database;
};


MongoDbCred.prototype.toString = function () {
    var hiddenPassword;
    if (this.password) {
        hiddenPassword = '__HIDDEN_PASSWORD__';
    }
    return MongoDbCred.createMongoDbUrl(this.host, this.port, this.database, this.username, hiddenPassword);
};


module.exports = MongoDbCred;