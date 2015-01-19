var baseFunctions = [
  undefined,
  require('./unaryBaseFunctions.js'),
  require('./binaryBaseFunctions.js')
];

var libraryNames = [
  undefined,
  'unaryBaseFunctions',
  'binaryBaseFunctions'
];

module.exports = function (arity, totalRequestedBaseFunctions) {
  var baseFunctionLib = baseFunctions[arity];
  var i;
  var randomIndex;
  var returnedBaseFunctions = {
    libs: [],
    names: [],
    fns: [],
    dominances: []
  };
  for (i = 0; i < totalRequestedBaseFunctions; i++) {
    randomIndex = Math.floor(Math.random() * baseFunctionLib.fns.length);
    returnedBaseFunctions.libs.push(libraryNames[randomIndex]);
    returnedBaseFunctions.names.push(baseFunctionLib.names[randomIndex]);
    returnedBaseFunctions.fns.push(baseFunctionLib.fns[randomIndex]);
    returnedBaseFunctions.dominances.push(baseFunctionLib.dominances[randomIndex]);
  }
  return returnedBaseFunctions;
};
