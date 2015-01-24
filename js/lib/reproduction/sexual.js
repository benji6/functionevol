var Ghost = require('../Ghost/Ghost.js');

var shouldI = function (prob) {
  if (Math.random() < prob) {
    return true;
  }
};

module.exports = function (parent0, parent1) {
  //parents are randomly selected
  var child = Ghost({
    arity: parent0.arity,
    length: parent0.length
  });
  var getRandom = function (int) {
    return Math.floor(Math.random() * int);
  };
  child.chromosomes[0] = parent0.chromosomes[getRandom(2)];
  child.chromosomes[1] = parent1.chromosomes[getRandom(2)];

  return child;
};
