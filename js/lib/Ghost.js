var getRandomBaseFunctions = require('./baseFunctions/getRandomBaseFunctions.js');

var Ghost = function (arity, length) {
  var initialFunctions = getRandomBaseFunctions(arity, length);

  this.arity = arity;
  this.accuracy = 0;
  this.libs = initialFunctions.libs;
  this.names = initialFunctions.names;
  this.chromosomes = [
      initialFunctions.fns,
      initialFunctions.fns
  ],
  this.fns,
  this.outputs;
};

Ghost.prototype.computeFns = function () {
  var chromosomes0Length = this.chromosomes[0].length;
  var chromosomes1Length = this.chromosomes[1].length;
  var length = Math.max(chromosomes0Length, chromosomes1Length);

  //working on this

  this.fns = this.chromosomes[0];
};

module.exports = Ghost;
