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
  this.fns = [],
  this.outputs = [];
};

Ghost.prototype.computeFns = function () {
  chromosome0 = this.chromosomes[0];
  chromosome1 = this.chromosomes[1];
  var length = Math.max(chromosome0.length, chromosome1.length);
  var i;
  var dominance0;
  var dominance1;
  for (i = 0; i < length; i++) {
    dominance0 = chromosome0[i] && chromosome0[i].dominance || 0;
    dominance1 = chromosome1[i] && chromosome1[i].dominance || 0;
    if (dominance0 >= dominance1) {
      this.fns[i] = chromosome0[i];
    } else {
      this.fns[i] = chromosome0[i];
    }
  }
};

module.exports = Ghost;
