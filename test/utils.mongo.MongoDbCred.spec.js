'use strict';
var Chai = require('chai');
var Sinon = require('sinon');
var SinonChai = require("sinon-chai");
Chai.use(SinonChai);

var expect = Chai.expect;

var Lab = require('lab');
var lab = exports.lab = Lab.script();

// Module under test
var Utils = require('../lib');


lab.experiment('joshball-node-utils', function () {

    var sandbox;
    lab.beforeEach(function (done) {
        // Don't log to the console for the test
        sandbox = Sinon.sandbox.create();
        done();
    });

    var host = 'mongo.com',
        port = 27017,
        database = 'some_database',
        username = 'abby',
        password = 'secret';

    lab.experiment('mongo', function () {

        lab.experiment('MongoDbCred', function () {

            lab.experiment('construction', function () {

                lab.test('should create a proper MongoDbCred from cred parameters', function (done) {

                    var mongoDbCred = new Utils.mongo.MongoDbCred(host, port, database, username, password);

                    expect(mongoDbCred.host).to.eql(host);
                    expect(mongoDbCred.port).to.eql(port);
                    expect(mongoDbCred.database).to.eql(database);
                    expect(mongoDbCred.username).to.eql(username);
                    expect(mongoDbCred.password).to.eql(password);

                    done();
                });

                lab.test('should create a proper mongo url from cred parameters', function (done) {

                    var mongoDbCred = new Utils.mongo.MongoDbCred(host, port, database, username, password);
                    var expectedUrl = 'mongodb://abby:secret@mongo.com:27017/some_database';

                    expect(mongoDbCred.url).to.eql(expectedUrl);

                    done();
                });

                lab.test('should create a mongourl (string) from createMongoDbUrl()', function (done) {

                    var mongoDbUrl = Utils.mongo.MongoDbCred.createMongoDbUrl(host, port, database, username, password);

                    var expectedUrl = 'mongodb://abby:secret@mongo.com:27017/some_database';

                    expect(mongoDbUrl).to.eql(expectedUrl);

                    done();
                });

                lab.test('should create a MongoDbCred that has a toString method returning a url with a HIDDEN PASSWORD', function (done) {

                    var mongoDbCred = new Utils.mongo.MongoDbCred(host, port, database, username, password);
                    var expectedUrl = 'mongodb://abby:__HIDDEN_PASSWORD__@mongo.com:27017/some_database';

                    expect(mongoDbCred.toString()).to.eql(expectedUrl);

                    done();
                });


            });
        });

    });



});

