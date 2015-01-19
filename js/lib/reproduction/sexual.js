var Ghost = require('../Ghost.js');
var unaryBaseFunctions = require('../baseFunctions/unaryBaseFunctions');
var binaryBaseFunctions = require('../baseFunctions/binaryBaseFunctions');

var shouldI = function (mutationProb) {
  mutationProb = mutationProb || 1 / 3;
  if (Math.random() < mutationProb) {
    return true;
  }
};

module.exports = function (parent0, parent1) {
  var child = new Ghost(parent0.arity, parent0.libs, parent0.names, parent0.fns);
  return child;
};
