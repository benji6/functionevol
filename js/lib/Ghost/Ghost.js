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

var Ghost = function (params) {
  var chromosome0 = getRandomBaseFunctions(params.arity, params.length);
  var chromosome1 = getRandomBaseFunctions(params.arity, params.length);

  var arity = params.arity;
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
  return {
    arity: arity,
    accuracy: accuracy,
    libs: libs,
    names: names,
    chromosomes: chromosomes,
    dominance: dominance,
    fns: fns,
    outputs: outputs,

    computeFns: computeFns
  };
};

module.exports = Ghost;
