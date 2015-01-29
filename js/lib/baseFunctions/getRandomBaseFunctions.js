var baseFunctions = require('./lib/index.js');

var pushFromLibrary = function (baseFunctionLib, response) {
  var randomIndex = Math.floor(Math.random() * baseFunctionLib.fns.length);
  response.libs.push(baseFunctionLib);
  response.indices.push(randomIndex);
};

module.exports = function (arity, totalRequestedBaseFunctions) {
  var response = {
    libs: [],
    indices: []
  };

  (function pushBinaryFunctions (num) {
    if (!--num) {
      return;
    }
    pushFromLibrary(baseFunctions[2], response);
  }(arity));

  (function pushUnaryFunctions (num) {
    pushFromLibrary(baseFunctions[1], response);
    if (--num) {
      pushUnaryFunctions(num);
    }
  }(totalRequestedBaseFunctions - arity + 1));

  return response;
};
