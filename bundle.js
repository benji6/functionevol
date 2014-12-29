(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var compose = require('./compose.js');

module.exports = function(population, input, desiredOutput, survivors) {
	population.sort(function (a, b) {
		return Math.abs(compose.apply(null, a)(input) - desiredOutput) -
			Math.abs(compose.apply(null, b)(input) - desiredOutput);
	});
	population.splice(survivors);
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
}

module.exports = [add1, minus1, times2, divide2, negate, invert, square, squareRoot, sin];

},{}],3:[function(require,module,exports){
var randomIndex = require('./randomIndex.js');

module.exports = function (arr0, arr1) {
	arr0.splice(randomIndex(arr0) + 1);
	arr1.splice(randomIndex(arr1) + 1);
	return arr0.concat(arr1);
};

},{"./randomIndex.js":6}],4:[function(require,module,exports){
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

module.exports = function (population, input) {
	var num = population.length;
	while (num--) {
		console.log('length: ' + population[num].length);
		console.log(population[num].toString());
		var res = compose.apply(null, population[num]);
		console.log('output: ' + res(input));
		console.log('/////////////////////');
	}
};

},{"./compose.js":4}],6:[function(require,module,exports){
module.exports = function (arrLen) {
	if (arrLen && arrLen.length) {
		arrLen = arrLen.length;
	}
	return Math.floor(Math.random() * arrLen);
};

},{}],7:[function(require,module,exports){
var compose = require('./lib/compose.js');
var baseFunctions = require('./lib/baseFunctions/unaryBaseFunctions.js');
var randomIndex = require('./lib/randomIndex.js');
var applyFitness = require('./lib/applyFitness.js');
var breed = require('./lib/breed.js');
var printOutput = require('./lib/printOutput.js');

//Initial Population
var input = 12;
var desiredOutput = Math.PI * 2;
var popSize = 256;
var survivors = (popSize * .1).toFixed(0);
var num = popSize;
var population = [];
while (num--) {
	population[num] = [baseFunctions[randomIndex(baseFunctions)], baseFunctions[randomIndex(baseFunctions)]];
}

var newGeneration = function () {
	var child;
	var arr0;
	var arr1;
	while (population.length < popSize) {
		arr0 = population[randomIndex(survivors)].slice(0);
		arr1 = population[randomIndex(survivors)].slice(0);
		child = breed(arr0, arr1);
		population.push(child);
	}
	applyFitness(population, input, desiredOutput, survivors);
};
var generations = 32;
while (generations--) {
	newGeneration();
}

printOutput(population, input);
console.log('desired output: ' + desiredOutput);


//development - apply some degree of mutation so funcitons which are no longer used may be reintroduced
//also apply preferential treatment for shorter functions

},{"./lib/applyFitness.js":1,"./lib/baseFunctions/unaryBaseFunctions.js":2,"./lib/breed.js":3,"./lib/compose.js":4,"./lib/printOutput.js":5,"./lib/randomIndex.js":6}]},{},[7]);
