module.exports = function (ghost) {
  var i;
  var chromosome0 = ghost.chromosomes[0];
  var chromosome1 = ghost.chromosomes[1];
  var length = Math.max(chromosome0.length, chromosome1.length);
  var dominance0;
  var dominance1;
  for (i = 0; i < length; i++) {
    dominance0 = chromosome0[i] && chromosome0[i].dominance || 0;
    dominance1 = chromosome1[i] && chromosome1[i].dominance || 0;
    if (dominance0 >= dominance1) {
      ghost.fns[i] = chromosome0[i];
    } else {
      ghost.fns[i] = chromosome0[i];
    }
  }
};
