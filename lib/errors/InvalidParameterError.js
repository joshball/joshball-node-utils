'use strict';

var cl = require('contralog')(module);
var Util = require('util');

function InvalidParameterError(parameter, message) {
    this.name = 'InvalidParameter';
    this.parameter = parameter || 'unspecified';
    message = message || 'null parameter';
    this.message = Util.format('%s (%s)', message, parameter);
    cl.error('\nInvalidParameter:\n', this);
    cl.stack(5,5);
}
InvalidParameterError.prototype = new Error();
InvalidParameterError.prototype.constructor = InvalidParameterError;


module.exports = InvalidParameterError;