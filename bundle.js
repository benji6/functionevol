(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var compose = require('./compose.js');

module.exports = function(population, input, desiredOutput) {
	var survivorThreshold = (population.length * .1).toFixed(0);
	population.sort(function (a, b) {
		return Math.abs(compose.apply(null, a)(input) - desiredOutput) -
			Math.abs(compose.apply(null, b)(input) - desiredOutput);
	});
	return population.splice(survivorThreshold).slice(0);
};

},{"./compose.js":4}],2:[function(require,module,exports){
var add1 = function (x) {
	return x + 1;
};
var minus1 = function (x) {
	return x - 1;
};
var times2 = function (x) {
	return x * 2;
};
var divide2 = function(x) {
	return x / 2;
};
var negate = function (x) {
	return -x;
};
var invert = function (x) {
	res = 1 / x;
	if (isNaN(res)) {
		return 0;
	}
	return 1 / x;
};
var square = function (x) {
	return Math.pow(x, 2);
};
var squareRoot = function (x) {
	res = Math.sqrt(x);
	if (isNaN(res)) {
		return 0;
	}
	return res;
};
var sin = function (x) {
	return Math.sin(x);
};

module.exports = [
	add1,
	minus1,
	times2,
	divide2,
	negate,
	invert,
	square,
	squareRoot,
	sin
];

},{}],3:[function(require,module,exports){
var randomElement = require('./randomElement.js');
var unaryBaseFunctions = require('./baseFunctions/unaryBaseFunctions');
var mutationProb = 1 / 3;

var mutate = function(arr0) {
	if (Math.random() < mutationProb) {
		return mutate(arr0.concat(randomElement(unaryBaseFunctions)));
	}
	return arr0;
};

module.exports = function (arr0, arr1) {
	arr0.splice(randomElement(arr0) + 1);
	arr1.splice(randomElement(arr1) + 1);
	return mutate(mutate(mutate([]).concat(arr0)).concat(arr1));
};

},{"./baseFunctions/unaryBaseFunctions":2,"./randomElement.js":6}],4:[function(require,module,exports){
module.exports = function() {
	var fns = arguments;
	return function (x) {
		var num = fns.length;
		while (num--) {
			x = fns[num].call(this, x);
		}
		return x;
	};
};

},{}],5:[function(require,module,exports){
var compose = require('./compose.js');

module.exports = function (population, input, desiredOutput) {
	var num = population.length;
	while (num--) {
		console.log('length: ' + population[num].length);
		console.log(population[num].toString());
		var res = compose.apply(null, population[num]);
		console.log('output: ' + res(input));
		console.log('/////////////////////');
	}
	console.log('input was: ' + input);
	console.log('desired output: ' + desiredOutput);
};

},{"./compose.js":4}],6:[function(require,module,exports){
module.exports = function (arr) {
	return arr[Math.floor(Math.random() * arr.length)];
};

},{}],7:[function(require,module,exports){
module.exports = function (len) {
	return Math.floor(Math.random() * len);
};

},{}],8:[function(require,module,exports){
var compose = require('./lib/compose.js');
var baseFunctions = require('./lib/baseFunctions/unaryBaseFunctions.js');
var randomIndex = require('./lib/randomIndex.js');
var randomElement = require('./lib/randomElement.js');
var applyFitness = require('./lib/applyFitness.js');
var breed = require('./lib/breed.js');
var printOutput = require('./lib/printOutput.js');

//Initial Population
var input = Math.random();
var desiredOutput = Math.PI * 5;
var popSize = 256;
var generations = 64;
var num = popSize;
var population = [];
while (num--) {
	population[num] = [randomElement(baseFunctions), randomElement(baseFunctions)];
}
var survivors = population.slice(0);
var newGeneration = function () {
	var child;

	while (population.length < popSize) {
		child = breed(randomElement(survivors), randomElement(survivors));
		population.push(child);
	}

	survivors = applyFitness(population, input, desiredOutput);
};

while (generations--) {
	newGeneration();
}

printOutput(population, input, desiredOutput);

//development - apply preferential treatment for more optimised functions where outputs are the same

},{"./lib/applyFitness.js":1,"./lib/baseFunctions/unaryBaseFunctions.js":2,"./lib/breed.js":3,"./lib/compose.js":4,"./lib/printOutput.js":5,"./lib/randomElement.js":6,"./lib/randomIndex.js":7}]},{},[8]);
