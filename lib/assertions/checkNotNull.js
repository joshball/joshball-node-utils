'use strict';

var Errors = require('../errors');
var CL = require('contralog')(module);

var checkNotNull = function(parameterName, parameter){
    if(parameter === undefined || parameter === null) {
        CL.error('\n*** NULL PARAMETER: %s\n', parameterName);
        var ex = new Errors.InvalidParameter(parameterName, parameter);
        CL.exception(ex);
        CL.stack(1,5);
        throw ex;
    }
};

module.exports = checkNotNull;