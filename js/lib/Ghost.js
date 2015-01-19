var getRandomBaseFunctions = require('./baseFunctions/getRandomBaseFunctions.js');

var Ghost = function (arity, length, fns, libs, names) {
  var initialFunctions = getRandomBaseFunctions(arity, length);

  this.arity = arity;
  this.accuracy = 0;
  this.libs = libs || initialFunctions.libs;
  this.names = names || initialFunctions.names;
  this.chromosomes = [
    [

    ]
  ],
  this.fns = fns || initialFunctions.fns;
};

module.exports = Ghost;
