var getRandomBaseFunction = require('./baseFunctions/getRandomBaseFunction');

var Ghost = function (arity, libs, names, fns) {
  var firstFunction = getRandomBaseFunction(1);

  this.arity = arity;
  this.accuracy = 0;
  this.libs = libs || [
    firstFunction.lib
  ];
  this.names = names || [
    firstFunction.name
  ];
  this.funs = fns || [
    firstFunction.fn
  ];
};

module.exports = Ghost;
