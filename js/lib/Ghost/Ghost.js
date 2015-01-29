var getRandomBaseFunctions = require('../baseFunctions/getRandomBaseFunctions.js');

var Ghost = function (arity, length) {
  var accuracy = 0;
  var chromosomes = [
    getRandomBaseFunctions(arity, length),
    getRandomBaseFunctions(arity, length)
  ];
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
    chromosomes,
    outputs,
    args,
    mutationCoefficient
  };
};

module.exports = Ghost;
