var getRandomBaseFunctions = require('../baseFunctions/getRandomBaseFunctions.js');

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
  var dominances = [
    chromosome0.dominances,
    chromosome1.dominances
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

  var mutationCoefficient = 1 / 8;

  return {
    arity,
    accuracy,
    libs,
    names,
    chromosomes,
    dominances,
    fns,
    outputs,
    args,
    mutationCoefficient
  };
};

module.exports = Ghost;
