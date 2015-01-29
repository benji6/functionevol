var baseFunctions = [
  undefined,
  require('./lib/unaryBaseFunctions.js'),
  require('./lib/binaryBaseFunctions.js')
];

var pushFromLibrary = function (baseFunctionLib, response) {
  var randomIndex = Math.floor(Math.random() * baseFunctionLib.fns.length);
  response.lib.push(baseFunctionLib);
  response.idx.push(randomIndex);
};

module.exports = function (arity, totalRequestedBaseFunctions) {
  var response = {
    lib: [],
    idx: []
  };

  (function pushBinaryFunctions (num) {
    pushFromLibrary(baseFunctions[2], response);
    if (--num) {
      pushBinaryFunctions(num);
    }
  }(arity));

  (function pushUnaryFunctions (num) {
    pushFromLibrary(baseFunctions[1], response);
    if (--num) {
      pushUnaryFunctions(num);
    }
  }(totalRequestedBaseFunctions - arity + 1));

  return response;
};
