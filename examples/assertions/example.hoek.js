'use strict';

var cl = require('contralog')(module);
cl.on();
var Utils = require('../../lib/index');

var a = 1, b = 2;
Utils.Hoek.assert(a === b, 'a should equal b');  // Throws 'a should equal b'