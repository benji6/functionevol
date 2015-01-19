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

module.exports = function (arity) {
  var baseFunctionLib = baseFunctions[arity];
  var randomIndex = Math.floor(Math.random() * baseFunctionLib.fns.length);
  return {
    lib: libraryNames[randomIndex],
    name: baseFunctionLib.names[randomIndex],
    fn: baseFunctionLib.fns[randomIndex]
  };
};
