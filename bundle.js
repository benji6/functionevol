(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var compose = require('./compose.js');

var computeOutput = function(obj, inputs) {
	var outputs = [];
	var i;
	var composed = compose(obj.funs);
	for (i = 0; i < inputs.length; i++) {
		outputs.push(composed(inputs[i]));
	}
	obj.outputs = outputs;
};

var computeAccuracy = function(obj, desiredOutputs) {
	var accuracyDiff = 0;
	var i;
	for (i = 0; i < desiredOutputs.length; i++) {
		accuracyDiff += Math.pow(obj.outputs[i] - desiredOutputs[i], 2);
	}
	obj.accuracy = accuracyDiff;
};

module.exports = function(population, inputs, desiredOutputs) {
	var survivorThreshold = (population.length / 16).toFixed(0);
	population.forEach(function(el) {
		computeOutput(el, inputs);
		computeAccuracy(el, desiredOutputs);
	});
	population.sort(function (a, b) {
		var accuracyDiff = a.accuracy - b.accuracy;
		if (accuracyDiff === 0) {
			return a.funs.length - b.funs.length;
		}
		return accuracyDiff;
	});
	return population.splice(survivorThreshold).slice(0);
};

},{"./compose.js":4}],2:[function(require,module,exports){
var flip = require('../flip.js');

var binaryDecorator = function(fn) {
	//hack
	return function(arr) {
		return fn(arr, 1);
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
binaryBaseFunctions = [
	add,
	subtract,
	flip(subtract),
	multiply,
	flip(multiply),
	pow,
	flip(pow)
];
module.exports = binaryBaseFunctions.map(function(elem) {
	return binaryDecorator(elem);
});

},{"../flip.js":5}],3:[function(require,module,exports){
var identity = function(x) {
	return x;
};
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

module.exports = {
	names: [
		"identity",
		"add1",
		"minus1",
		"times2",
		"divide2",
		"negate",
		"invert",
		"square",
		"squareRoot",
		"sin"
	],
	funs: [
		identity,
		add1,
		minus1,
		times2,
		divide2,
		negate,
		invert,
		square,
		squareRoot,
		sin
	]
};

},{}],4:[function(require,module,exports){
module.exports = function(fns) {
	return function (x) {
		var i;
		for (i = 0; i < fns.length; i++) {
			x = fns[i].call(this, x);
		}
		return x;
	};
};

},{}],5:[function(require,module,exports){
module.exports = function(fn) {
	return function(x, y) {
		if (arguments.length === 2) {
			return fn.call(this, y, x);
		}
		return function(y) {
			return fn.call(this, y, x);
		};
	};
};

},{}],6:[function(require,module,exports){
var printLn = function(str) {
	var p = document.createElement('p');
	var txt = document.createTextNode(str);
	if (str === 'accuracy: 0') {
		p.style.color = red;
	}
	p.appendChild(txt);
	document.body.appendChild(p);
};

module.exports = function (population, inputs, desiredOutputs, timeElapsed) {
	var num = population.length;
	var elem;
	printLn('time elapsed: ' + timeElapsed + 'ms');
	//backwards loop so best results display first
	while (num--) {
		elem = population[num];
		printLn(elem.names.toString());
		printLn('length: ' + elem.funs.length);
		printLn('inputs: ' + inputs);
		printLn('outputs: ' + elem.outputs);
		printLn('desired outputs: ' + desiredOutputs);
		printLn(
			'accuracy: ' +
			elem.accuracy +
			' (0 is optimal, greater number correlates to greater inaccuracy)'
		);
		printLn('/////////////////////');
	}
};

},{}],7:[function(require,module,exports){
var randomIndex = require('./randomIndex');

module.exports = function (arr) {
	return arr[randomIndex(arr.length)];
};

},{"./randomIndex":8}],8:[function(require,module,exports){
module.exports = function (len) {
	return Math.floor(Math.random() * len);
};

},{}],9:[function(require,module,exports){
var randomElement = require('./randomElement.js');
var randomIndex = require('./randomIndex.js');
var unaryBaseFunctions = require('./baseFunctions/unaryBaseFunctions');
var mutationProb = 1 / 3;

//dev would be great to evolve this module

var objPush = function(obj, e1, e2, e3) {
		obj.libs.push(e1);
		obj.names.push(e2);
		obj.funs.push(e3);
};
var objSlice = function(obj, fr, to) {
	if (to) {
		return {
			libs: obj.libs.slice(0, to),
			names: obj.names.slice(0, to),
			funs: obj.funs.slice(0, to)
		};
	}
	return {
		libs: obj.libs.slice(0),
		names: obj.names.slice(0),
		funs: obj.funs.slice(0)
	};
};
var objSplice = function(obj, idx) {
	obj.libs.splice(idx, 1);
	obj.names.splice(idx, 1);
	obj.funs.splice(idx, 1);
};
var objConcat = function(obj0, obj1) {
	return {
		libs: obj0.libs.concat(obj1.libs),
		names: obj0.names.concat(obj1.names),
		funs: obj0.funs.concat(obj1.funs)
	};
};

var mutate = function(obj) {
	if (Math.random() < mutationProb) {
		var randomFn = randomIndex(unaryBaseFunctions.funs.length);
		objPush(obj, 'unaryBaseFunctions',
			unaryBaseFunctions.names[randomFn],
			unaryBaseFunctions.funs[randomFn]);

		return mutate(obj);
	}
	if (Math.random() < mutationProb) {
		var funsLength = obj.funs.length;
		if (funsLength > 1) {
			var randomIdx = randomIndex(funsLength);
			objSplice(obj);

			return mutate(obj);
		}
	}
	return obj;
};
var computeGamete = function(obj, fr, to) {
	if (Math.random() < mutationProb * 16) {
		return objSlice(obj, fr, to);
	}
	return objSlice(obj, fr);
};
var fertilisation = function(gamete0, gamete1) {
	if (Math.random() < mutationProb) {
		return objConcat(gamete0, gamete1);
	}
	return gamete0;
};
module.exports = function (parent0, parent1) {
	var mutantParent0 = mutate(parent0);
	var mutantParent1 = mutate(parent1);
	//always include at least first element from arr0
	var gamete0 = computeGamete(mutantParent0, 0, randomIndex(mutantParent0.funs.length - 1) + 1);
	//never include the first element of arr1
	var gamete1 = computeGamete(mutantParent1, 1, randomIndex(mutantParent1.funs.length - 1));

	var mutantGamete0 = mutate(gamete0);
	var mutantGamete1 = mutate(gamete1);

	var child = fertilisation(mutantGamete0, mutantGamete1);

	return mutate(child);
};

},{"./baseFunctions/unaryBaseFunctions":3,"./randomElement.js":7,"./randomIndex.js":8}],10:[function(require,module,exports){
//time app
var tinytic = require('tinytic');
tinytic.toc();

var compose = require('./lib/compose.js');
var unaryBaseFunctions = require('./lib/baseFunctions/unaryBaseFunctions.js');
var binaryBaseFunctions = require('./lib/baseFunctions/binaryBaseFunctions.js');
var randomIndex = require('./lib/randomIndex.js');
var randomElement = require('./lib/randomElement.js');
var applyFitness = require('./lib/applyFitness.js');
var reproduce = require('./lib/reproduce.js');
var printOutput = require('./lib/printOutput.js');


//Initial Population
var inputs = [1, 2, 3, 4, 5];
var desiredFunction = function(inputs) {
	return inputs.map(function(elem) {
		return -(Math.pow(elem, 2) - 1) * 2;
	});
};
var desiredOutputs = desiredFunction(inputs);
var popSize = 768;
var generations = popSize;
var num = popSize;
var population = [];
var randomIndexUnary = randomIndex(unaryBaseFunctions.funs.length);
while (num--) {
	population[num] = {
		accuracy: 0,
		//dev - first function possibly a binary for dual input
		libs: [
			//'binaryBaseFunctions',
			'unaryBaseFunctions'
		],
		names: [
			unaryBaseFunctions.names[randomIndexUnary]
		],
		funs: [
			//randomElement(binaryBaseFunctions),
			unaryBaseFunctions.funs[randomIndexUnary]
		]
	};
}
var survivors = population.slice(0);
var newGeneration = function () {
	var child;

	while (population.length < popSize) {
		child = reproduce(randomElement(survivors), randomElement(survivors));
		population.push(child);
	}

	survivors = applyFitness(population, inputs, desiredOutputs);
};
while (generations--) {
	newGeneration();
}
printOutput(population, inputs, desiredOutputs, tinytic.toc());

},{"./lib/applyFitness.js":1,"./lib/baseFunctions/binaryBaseFunctions.js":2,"./lib/baseFunctions/unaryBaseFunctions.js":3,"./lib/compose.js":4,"./lib/printOutput.js":6,"./lib/randomElement.js":7,"./lib/randomIndex.js":8,"./lib/reproduce.js":9,"tinytic":11}],11:[function(require,module,exports){
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

},{}]},{},[10]);
