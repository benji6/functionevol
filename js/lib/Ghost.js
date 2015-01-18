var randomIndex = require('./randomIndex.js');
var randomElement = require('./randomElement.js');
var unaryBaseFunctions = require('./baseFunctions/unaryBaseFunctions.js');
var binaryBaseFunctions = require('./baseFunctions/binaryBaseFunctions.js');

var randomIndexUnary = randomIndex(unaryBaseFunctions.funs.length);
var randomIndexBinary = randomIndex(binaryBaseFunctions.funs.length);

module.exports = function () {
  this.accuracy = 0;
  this.libs = [
    'binaryBaseFunctions',
    'unaryBaseFunctions'
  ];
  this.names = [
    binaryBaseFunctions.names[randomIndexBinary],
    unaryBaseFunctions.names[randomIndexUnary]
  ];
  this.funs = [
    binaryBaseFunctions.funs[randomIndexBinary],
    unaryBaseFunctions.funs[randomIndexUnary]
  ];
};
