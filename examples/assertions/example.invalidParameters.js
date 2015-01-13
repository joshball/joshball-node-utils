'use strict';

var cl = require('contralog')(module);
cl.on();
var Utils = require('../../lib/index');

var invalidParameters = function (some, params) {
    cl.trace('invalidParameters');
    Utils.assertions.checkNotNull(some);
    Utils.assertions.checkNotNull(params);
};

var sub = function(){
    cl.trace('sub');
    invalidParameters('some');
};

var main = function(){
    cl.trace('main');
    sub();
};


main();