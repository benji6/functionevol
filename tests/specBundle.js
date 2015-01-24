(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/b/wip/functionevol/js/lib/Ghost/Ghost.js":[function(require,module,exports){
var getRandomBaseFunctions = require('../baseFunctions/getRandomBaseFunctions.js');

var computeFns = function () {
  var i;
  var chromosome0 = this.chromosomes[0];
  var chromosome1 = this.chromosomes[1];
  var length = Math.max(chromosome0.length, chromosome1.length);
  var dominance0;
  var dominance1;
  for (i = 0; i < length; i++) {
    dominance0 = chromosome0[i] && chromosome0[i].dominance || 0;
    dominance1 = chromosome1[i] && chromosome1[i].dominance || 0;
    if (dominance0 >= dominance1) {
      this.fns[i] = chromosome0[i];
    } else {
      this.fns[i] = chromosome0[i];
    }
  }
};

var Ghost = function (params) {
  var chromosome0 = getRandomBaseFunctions(params.arity, params.length);
  var chromosome1 = getRandomBaseFunctions(params.arity, params.length);

  var arity = params.arity;
  var accuracy = 0;
  var libs = [
    chromosome0.libs,
    chromosome1.libs
  ];
  var names = [
    chromosome0.names,
    chromosome1.names
  ];
  var chromosomes = [
    chromosome0.fns,
    chromosome1.fns
  ];
  var dominance = [
    chromosome0.dominance,
    chromosome1.dominance
  ];
  var fns = [];
  var outputs = [];

  return {
    arity,
    accuracy,
    libs,
    names,
    chromosomes,
    dominance,
    fns,
    outputs,

    computeFns
  };
};

module.exports = Ghost;

},{"../baseFunctions/getRandomBaseFunctions.js":"/home/b/wip/functionevol/js/lib/baseFunctions/getRandomBaseFunctions.js"}],"/home/b/wip/functionevol/js/lib/baseFunctions/getRandomBaseFunctions.js":[function(require,module,exports){
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

},{"./lib/binaryBaseFunctions.js":"/home/b/wip/functionevol/js/lib/baseFunctions/lib/binaryBaseFunctions.js","./lib/unaryBaseFunctions.js":"/home/b/wip/functionevol/js/lib/baseFunctions/lib/unaryBaseFunctions.js"}],"/home/b/wip/functionevol/js/lib/baseFunctions/lib/binaryBaseFunctions.js":[function(require,module,exports){
var flip = function(fn) {
	return function(x, y) {
		return fn(y, x);
	};
};

var add = function (x, y) {
	return x + y;
};
var subtract = function (x, y) {
	return x - y;
};
var multiply = function (x, y) {
	return x * y;
};
var divide = function (x, y) {
	return x / y;
};
var pow = function (x, y) {
	return Math.pow(x, y);
};

module.exports = {
	names: [
		'add',
		'subtract',
		'flip(subtract)',
		'multiply',
		'flip(multiply)',
		'pow',
		'flip(pow)'
	],
	fns: [
		add,
		subtract,
		flip(subtract),
		multiply,
		flip(multiply),
		pow,
		flip(pow)
	],
	dominances: [
		0.2,
		0.2,
		0.2,
		0.4,
		0.4,
		0.6,
		0.6
	]
};

},{}],"/home/b/wip/functionevol/js/lib/baseFunctions/lib/unaryBaseFunctions.js":[function(require,module,exports){
var identity = function(x) {
	return x;
};
var negate = function (x) {
	return -x;
};
var sin = function (x) {
	return Math.sin(x);
};
var cos = function (x) {
	return Math.cos(x);
};

module.exports = {
	names: [
		"identity",
		"negate",
		"sin",
		"cos"
	],
	fns: [
		identity,
		negate,
		sin,
		cos
	],
	dominances: [
		0.2,
		0.4,
		0.6,
		0.8
	]
};

},{}],"/home/b/wip/functionevol/tests/spec.js":[function(require,module,exports){
var Ghost = require('../js/lib/Ghost/Ghost.js');

describe("Ghost", function () {
  it("returns an object when called", function () {
    expect(Ghost({})).toEqual(jasmine.any(Object));
  });
  it("", function() {
    expect(Ghost({})).toEqual(jasmine.any(Object));
  });
});

describe("ghost: generated by Ghost with arity 1 and length 8", function () {
  var ghost;
  beforeEach(function() {
    ghost = Ghost({
      arity: 1,
      length: 8
    });
  });
  it("has a chromosomes property which is an array", function () {
    expect(ghost.chromosomes).toEqual(jasmine.any(Array));
  });
  it("has a chromosomes property which is an array of length 2", function () {
    expect(ghost.chromosomes.length).toEqual(2);
  });
  it("has chromosomes[0].length = 8", function () {
    expect(ghost.chromosomes[0].length).toEqual(8);
  });
  it("has chromosomes[1].length = 8", function () {
    expect(ghost.chromosomes[1].length).toEqual(8);
  });
});

},{"../js/lib/Ghost/Ghost.js":"/home/b/wip/functionevol/js/lib/Ghost/Ghost.js"}]},{},["/home/b/wip/functionevol/tests/spec.js"]);
