(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var compose = require('./compose.js');

module.exports = function(population, input, desiredOutput) {
	var survivorThreshold = (population.length * .1).toFixed(0);
	population.sort(function (a, b) {
		var accuracyDiff = Math.abs(compose(a.funs)(input) - desiredOutput) -
			Math.abs(compose(b.funs)(input) - desiredOutput);
		if (accuracyDiff === 0) {
			return a.funs.length - b.funs.length;
		}
		return accuracyDiff;
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
		return x;
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
var randomIndex = require('./randomIndex.js');
var unaryBaseFunctions = require('./baseFunctions/unaryBaseFunctions');
var mutationProb = 1 / 3;

var mutate = function(obj) {
	if (Math.random() < mutationProb) {
		obj.libs.push('unaryBaseFunctions');
		obj.funs.push(randomElement(unaryBaseFunctions));
		
		return mutate(obj);
	}
	return obj;
};

module.exports = function (obj0, obj1) {
	//always include at least first element from arr0
	var randomIndex0 = randomIndex(obj0.funs.length);
	var randomIndex1 = randomIndex(obj1.funs.length - 1);
	var libs0Sliced = obj0.libs.slice(0, randomIndex0);
	var funs0Sliced = obj0.funs.slice(0, randomIndex0);
	//never include the first element of arr1
	var libs1Sliced = obj1.libs.slice(1, randomIndex1);
	var funs1Sliced = obj1.funs.slice(1, randomIndex1);

	var child = {
		libs: libs0Sliced,
		funs: funs0Sliced
	};
	var mutantChild = mutate(child);
	mutantChild.libs = mutantChild.libs.concat(libs1Sliced);
	mutantChild.funs = mutantChild.funs.concat(funs1Sliced);
	return mutate(mutantChild);
};

},{"./baseFunctions/unaryBaseFunctions":2,"./randomElement.js":7,"./randomIndex.js":8}],4:[function(require,module,exports){
module.exports = function(fns) {
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

module.exports = function(obj) {
	var funChain = obj.funs;
	var composed = compose(funChain);
	return {
		funChain: funChain,
		composed: composed
	};
};

},{"./compose.js":4}],6:[function(require,module,exports){
var composeFunctionChain = require('./composeFunctionChain.js');

module.exports = function (population, input, desiredOutput) {
	var num = population.length;
	var funChain;
	var composedRes;
	while (num--) {
		res = composeFunctionChain(population[num]);
		console.log('length: ' + res.funChain.length);
		console.log(res.funChain.toString());
		composedRes = res.composed(input);
		console.log('output: ' + composedRes);
		console.log('accuracry: ' +
			(1 - Math.abs(composedRes - desiredOutput)));
		console.log('/////////////////////');
	}
	console.log('input was: ' + input);
	console.log('desired output: ' + desiredOutput);
};

},{"./composeFunctionChain.js":5}],7:[function(require,module,exports){
var randomIndex = require('./randomIndex');

module.exports = function (arr) {
	return arr[randomIndex(arr.length)];
};

},{"./randomIndex":8}],8:[function(require,module,exports){
module.exports = function (len) {
	return Math.floor(Math.random() * len);
};

},{}],9:[function(require,module,exports){
//time app
var tinytic = require('tinytic');
tinytic.toc();

var compose = require('./lib/compose.js');
var baseFunctions = require('./lib/baseFunctions/unaryBaseFunctions.js');
var randomIndex = require('./lib/randomIndex.js');
var randomElement = require('./lib/randomElement.js');
var applyFitness = require('./lib/applyFitness.js');
var breed = require('./lib/breed.js');
var printOutput = require('./lib/printOutput.js');


//Initial Population
var input = 4;
var desiredOutput = 12;
var popSize = 256;
var generations = popSize;
var num = popSize;
var population = [];
while (num--) {
	population[num] = {
		//dev - trying to ensure first function is not overridden
		libs: [
			'none',
			'unaryBaseFunctions'
		],
		funs: [
			function(x) {
				return x;
			},
			randomElement(baseFunctions)
		]
	};
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
console.log('time elapsed: ' + tinytic.toc());

},{"./lib/applyFitness.js":1,"./lib/baseFunctions/unaryBaseFunctions.js":2,"./lib/breed.js":3,"./lib/compose.js":4,"./lib/printOutput.js":6,"./lib/randomElement.js":7,"./lib/randomIndex.js":8,"tinytic":10}],10:[function(require,module,exports){
var then = new Date().getTime();
var now = new Date().getTime();

var toc = function(maxDT) {
	then = now;
	now = new Date().getTime();
	var dT = now - then;
	if (maxDT !== undefined && maxDT < dT) {
		return maxDT;
	}
	return dT;
};

exports.toc = toc;

},{}]},{},[9]);
