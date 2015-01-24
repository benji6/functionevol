var Ghost = require('../Ghost/Ghost.js');

var shouldI = function (prob) {
  if (Math.random() < prob) {
    return true;
  }
};

module.exports = function (parent0, parent1) {
  //parents are randomly selected
  var child = Ghost(parent0.arity, parent0.length);
  var getRandom = function (int) {
    return Math.floor(Math.random() * int);
  };
  var random0 = getRandom(2);
  var random1 = getRandom(2);
  child.chromosomes[0] = parent0.chromosomes[random0];
  child.chromosomes[1] = parent1.chromosomes[random1];
  child.names[0] = parent0.names[random0];
  child.names[1] = parent1.names[random1];

  return child;
};
