var Ghost = require('../Ghost.js');

var shouldI = function (prob) {
  if (Math.random() < prob) {
    return true;
  }
};

module.exports = function (parent0, parent1) {
  var child = new Ghost(parent0.arity, parent0.libs, parent0.names, parent0.fns);
  return child;
};
