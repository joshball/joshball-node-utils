'use strict';

var Errors = require('../errors');
var cl = require('contralog')(module);

var checkNotNull = function(parameterName, parameter){
    if(!parameter) {
        cl.error('\n*** NULL PARAMETER: %s\n', parameterName);
        var ex = new Errors.InvalidParameter(parameterName, parameter);
        cl.exception(ex);
        cl.stack(1,5);
        throw ex;
    }
};

module.exports = checkNotNull;