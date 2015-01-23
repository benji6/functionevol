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
  randomIndex = Math.floor(Math.random() * baseFunctionLib.fns.length);
  returnedBaseFunctions.libs.push(libraryNames[randomIndex]);
  returnedBaseFunctions.names.push(baseFunctionLib.names[randomIndex]);
  returnedBaseFunctions.fns.push(baseFunctionLib.fns[randomIndex]);
  returnedBaseFunctions.dominances.push(baseFunctionLib.dominances[randomIndex]);
};

module.exports = function (arity, totalRequestedBaseFunctions) {
  var i;
  var randomIndex;
  var returnedBaseFunctions = {
    libs: [],
    names: [],
    fns: [],
    dominances: []
  };
  pushFromLibrary(baseFunctions[2], returnedBaseFunctions);
  pushFromLibrary(baseFunctions[2], returnedBaseFunctions);
  pushFromLibrary(baseFunctions[2], returnedBaseFunctions);
  pushFromLibrary(baseFunctions[2], returnedBaseFunctions);
  (function loop (num) {
    pushFromLibrary(baseFunctions[arity], returnedBaseFunctions);
    --num && loop(num);
  }(8));
  return returnedBaseFunctions;
};
