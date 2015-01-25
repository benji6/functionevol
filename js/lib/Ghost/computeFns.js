module.exports = function (ghost) {
  ghost.fns = [];
  ghost.chromosomes.sort(function (a, b) {
    return a.length < b.length;
  });
  var chromosome1 = ghost.chromosomes[1];
  ghost.chromosomes[0].forEach(function (element, index) {
    var dominance0 = this.dominances[0][index];
    var dominance1 = chromosome1[index] || 0;
    if (dominance1) {
      dominance1 = this.dominances[1][index];
    }
    if (dominance0 >= dominance1) {
      ghost.fns.push(element);
      return;
    }
    ghost.fns.push(chromosome1[index]);
  }, ghost);
};
