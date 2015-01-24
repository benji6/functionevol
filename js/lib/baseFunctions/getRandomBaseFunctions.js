var baseFunctions = [
  undefined,
  require('./lib/unaryBaseFunctions.js'),
  require('./lib/binaryBaseFunctions.js')
];

var libraryNames = [
  undefined,
  'unaryBaseFunctions',
  'binaryBaseFunctions'
];

var pushFromLibrary = function (baseFunctionLib, returnedBaseFunctions) {
  var randomIndex = Math.floor(Math.random() * baseFunctionLib.fns.length);
  returnedBaseFunctions.libs.push(libraryNames[randomIndex]);
  returnedBaseFunctions.names.push(baseFunctionLib.names[randomIndex]);
  returnedBaseFunctions.fns.push(baseFunctionLib.fns[randomIndex]);
  returnedBaseFunctions.dominances.push(baseFunctionLib.dominances[randomIndex]);
};

module.exports = function (arity, totalRequestedBaseFunctions) {
  var returnedBaseFunctions = {
    libs: [],
    names: [],
    fns: [],
    dominances: []
  };

  (function pushBinaryFunctions (num) {
    if (!--num) {
      return;
    }
    pushFromLibrary(baseFunctions[2], returnedBaseFunctions);
    pushBinaryFunctions(num);
  }(arity));

  (function pushUnaryFunctions (num) {
    pushFromLibrary(baseFunctions[1], returnedBaseFunctions);
    if (--num) {
      pushUnaryFunctions(num);
    }
  }(totalRequestedBaseFunctions - arity + 1));

  return returnedBaseFunctions;
};
