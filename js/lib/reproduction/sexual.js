var Ghost = require('../Ghost/Ghost.js');

var shouldI = (prob) => Math.random() < prob;

module.exports = function (parent0, parent1) {
  //parents are randomly selected
  var child = Ghost(parent0.arity, parent0.length);
  var getRandom = (int) => Math.floor(Math.random() * int);
  var random0 = getRandom(2);
  var random1 = getRandom(2);
  child.chromosomes[0] = parent0.chromosomes[random0];
  child.chromosomes[1] = parent1.chromosomes[random1];
  child.args.forEach((element) =>
    element * (1 + 2 * (0.5 - Math.random()) * child.mutationCoefficient));

  return child;
};
