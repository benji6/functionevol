(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var compose = require('./compose.js');

module.exports = function(population, input, desiredOutput) {
	var top10Percent = (population.length * .1).toFixed(0);
	population.sort(function (a, b) {
		return Math.abs(compose.apply(null, a)(input) - desiredOutput) -
			Math.abs(compose.apply(null, b)(input) - desiredOutput);
	});
	population.splice(top10Percent);
};

},{"./compose.js":3}],2:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
module.exports = function (arrLen) {
	if (arrLen && arrLen.length) {
		arrLen = arrLen.length;
	}
	return Math.floor(Math.random() * arrLen);
};

},{}],5:[function(require,module,exports){
var compose = require('./lib/compose.js');
var baseFunctions = require('./lib/baseFunctions/unaryBaseFunctions.js');
var randomIndex = require('./lib/randomIndex.js');
var applyFitness = require('./lib/applyFitness.js');

//Initial Population
var popSize = 256;
var top10Percent = (popSize * .1).toFixed(0);
var num = popSize;
var population = [];
while (num--) {
	population[num] = [baseFunctions[randomIndex(baseFunctions)], baseFunctions[randomIndex(baseFunctions)]];
}
var input = 12;
var desiredOutput = Math.PI * 2;

//Breed Function
var breed = function (arr0, arr1) {
	var intRandInd = randomIndex(arr0) + 1;
	if (intRandInd < arr0.length) {
		arr0.splice(intRandInd);
	}
	intRandInd = randomIndex(arr1) + 1;
	if (intRandInd < arr0.length) {
		arr1.splice(intRandInd);
	}
	var num = arr1.length;
	while (num--) {
		arr0.push(arr1[num]);
	}
	return arr0;
};
var newGeneration = function () {
	var child;
	var arr0;
	var arr1;
	while (population.length < popSize) {
		//pass arrays by value not by reference
		arr0 = population[randomIndex(top10Percent)].slice(0);
		arr1 = population[randomIndex(top10Percent)].slice(0);
		child = breed(arr0, arr1);
		population.push(child);
	}
	applyFitness(population, input, desiredOutput);
};
var generations = 32;
while (generations--) {
	newGeneration();
}

var printOutput = (function () {
	var num = population.length;
	while (num--) {
		console.log(population[num].length);
		console.log(population[num].toString());
		var res = compose.apply(null, population[num]);
		console.log(res(input));
	}
})();
console.log(desiredOutput);
//development - apply some degree of mutation so funcitons which are no longer used may be reintroduced
//also apply preferential treatment for shorter functions

},{"./lib/applyFitness.js":1,"./lib/baseFunctions/unaryBaseFunctions.js":2,"./lib/compose.js":3,"./lib/randomIndex.js":4}]},{},[5]);
