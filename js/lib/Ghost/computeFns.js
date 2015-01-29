var getBaseFunction = require('../baseFunctions/getBaseFunction.js');

module.exports = function (ghost) {
  var fns = [];
  var chromosomesCopy = ghost.chromosomes.slice(0, ghost.chromosomes.length);
  chromosomesCopy.sort(function (a, b) {
    return a.libs.length < b.libs.length;
  });
  var libs1 = chromosomesCopy[1].libs;
  var indices1 = chromosomesCopy[1].indices;
  chromosomesCopy[0].libs.forEach(function (lib0, i) {
    var index0 = chromosomesCopy[0].indices[i];
    var index1 = chromosomesCopy[1].indices[i];
    var lib1 = chromosomesCopy[1].libs[i];
    var dominance0 = getBaseFunction.dominance(lib0, index0);
    var dominance1 = getBaseFunction.dominance(lib1, index1) || 0;
    if (dominance0 >= dominance1) {
      return fns.push(getBaseFunction.fn(lib0, index0));
    }
    fns.push(getBaseFunction.fn(lib1, index1));
  });
  return fns;
};
