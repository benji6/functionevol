var getRandomBaseFunctions = require('../baseFunctions/getRandomBaseFunctions.js');

var computeFns = function () {
  var i;
  var chromosome0 = this.chromosomes[0];
  var chromosome1 = this.chromosomes[1];
  var length = Math.max(chromosome0.length, chromosome1.length);
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

var Ghost = function (arity, length) {
  var chromosome0 = getRandomBaseFunctions(arity, length);
  var chromosome1 = getRandomBaseFunctions(arity, length);

  var accuracy = 0;
  var libs = [
    chromosome0.libs,
    chromosome1.libs
  ];
  var names = [
    chromosome0.names,
    chromosome1.names
  ];
  var chromosomes = [
    chromosome0.fns,
    chromosome1.fns
  ];
  var dominance = [
    chromosome0.dominance,
    chromosome1.dominance
  ];
  var fns = [];
  var outputs = [];

  var args = (function populateArgs (arity, args) {
    if (arity <= 1) {
      return args;
    }
    args.push(Math.random());
    return populateArgs(--arity, args);
  }(arity, []));

  return {
    arity,
    accuracy,
    libs,
    names,
    chromosomes,
    dominance,
    fns,
    outputs,
    args,

    computeFns
  };
};

module.exports = Ghost;
