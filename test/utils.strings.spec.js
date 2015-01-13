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

    lab.experiment('mongo', function () {

        lab.experiment('strings', function () {

            lab.experiment('endsWith', function () {

                lab.test('should create a proper MongoDbCred from cred parameters', function (done) {

                    expect(Utils.string.endsWith('foo.bar.com','')).to.be.true;
                    expect(Utils.string.endsWith('foo.bar.com','com')).to.be.true;
                    expect(Utils.string.endsWith('foo.bar.com','.com')).to.be.true;
                    expect(Utils.string.endsWith('foo.bar.com','foo.bar.com')).to.be.true;
                    expect(Utils.string.endsWith('foo.bar.com','.foo.bar.com')).to.be.false;

                    done();
                });
            });
        });

    });



});

