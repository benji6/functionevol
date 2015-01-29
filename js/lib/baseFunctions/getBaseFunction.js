var baseFunctions = require('./lib/index.js');

module.exports = {
  dominance: function (lib, index) {
    return lib.dominances[index];
  },
  fn: function (lib, index) {
    return lib.fns[index];
  }
};
