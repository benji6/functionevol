var Ghost = require('../Ghost/Ghost.js');

// var shouldI = (prob) => Math.random() < prob;

var getRandom = (int) => Math.floor(Math.random() * int);
var meiosis = (chromosomes) => chromosomes[getRandom(chromosomes.length)];

module.exports = function (parent0, parent1) {
  var child = Ghost(parent0.arity, parent0.length);
  child.chromosomes[0] = meiosis(parent0.chromosomes);
  child.chromosomes[1] = meiosis(parent1.chromosomes);
  child.chromosomes.sort(function (a, b) {
    return a.libs.length < b.libs.length;
  });
  child.args.forEach((element) =>
    element * (1 + 2 * (0.5 - Math.random()) * child.mutationCoefficient));

  return child;
};
