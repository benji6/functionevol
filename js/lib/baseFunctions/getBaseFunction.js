var baseFunctions = require('./lib/index.js');

['dominance', 'fn', 'name'].forEach((elem) => {
  module.exports[elem] = function (lib, index) {
    return lib[elem + 's'][index];
  };
  module.exports[elem + 's'] = function (libs, indices) {
    return libs.reduce(function (acc, lib, i) {
      acc.push(lib[elem + 's'][indices[i]]);
      return acc;
    }, []);
  };
});
