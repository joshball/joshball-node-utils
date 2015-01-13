'use strict';
var Chai = require('chai');
var Sinon = require('sinon');
var SinonChai = require("sinon-chai");
Chai.use(SinonChai);

var expect = Chai.expect;

var cl = require('contralog')(module);
//cl.on();

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

    var mongoDbCred = new Utils.mongo.MongoDbCred();

    var userSchema = new Utils.mongo.Mongoose.Schema({ firstName: 'string', lastName: { type: String, index: true, unique: true } });
    var UserModel = Utils.mongo.Mongoose.model('User', userSchema);

    var accountSchema = new Utils.mongo.Mongoose.Schema({ accountId: 'string', users: {type: Utils.mongo.Mongoose.Schema.Types.ObjectId, ref: 'User'} });
    var AccountModel = Utils.mongo.Mongoose.model('Account', accountSchema);

    lab.experiment('mongo', function () {

        lab.experiment('MongoDbCred', function () {

            lab.experiment('construction', function () {

                lab.test('should create a proper MongoDbCred from cred parameters', function (done) {

                    var userModelIndexSpy = sandbox.spy(UserModel, 'ensureIndexes');
                    var accountModelIndexSpy = sandbox.spy(AccountModel, 'ensureIndexes');

                    var mongoMgr = new Utils.mongo.MongooseMgr(mongoDbCred.url);
                    mongoMgr.addModel('User',UserModel);
                    mongoMgr.addModel('Account',AccountModel);

                    expect(mongoMgr.models.User).to.be.eql(UserModel);
                    expect(mongoMgr.models.Account).to.be.eql(AccountModel);


                    mongoMgr.initializeAsync()
                        .then(function(r){
                            expect(userModelIndexSpy).to.be.calledOnce;
                            expect(accountModelIndexSpy).to.be.calledOnce;
                            done();
                        })
                        .catch(done);
                });
            });
        });

    });



});

