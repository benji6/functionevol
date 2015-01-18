(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./baseFunctions/binaryBaseFunctions.js":3,"./baseFunctions/unaryBaseFunctions.js":4,"./randomElement.js":7,"./randomIndex.js":8}],2:[function(require,module,exports){
var chain = require('./chain.js');

var computeOutput = function(obj, inputs, secondArgument) {
	var outputs = [];
	var i;
	var chained = chain(obj.funs);
	for (i = 0; i < inputs.length; i++) {
		outputs.push(chained(inputs[i])(secondArgument));
	}
	obj.outputs = outputs;
};

var computeAccuracy = function(obj, desiredOutputs) {
	var accuracyDiff = 0;
	var i;
	var desiredOutputsLen = desiredOutputs.length;
	for (i = 0; i < desiredOutputs.length; i++) {
		accuracyDiff += Math.abs(obj.outputs[i] - desiredOutputs[i]);
	}
	obj.accuracy = accuracyDiff / desiredOutputsLen;
};

module.exports = function(population, inputs, desiredOutputs, secondArgument) {
	var survivorThreshold = (population.length / 16).toFixed(0);
	population.forEach(function(el) {
		computeOutput(el, inputs, secondArgument);
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

},{"./chain.js":5}],3:[function(require,module,exports){
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
	funs: [
		add,
		subtract,
		flip(subtract),
		multiply,
		flip(multiply),
		pow,
		flip(pow)
	]
};

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
module.exports = function chain (fns) {
  return function (x, i) {
    i = i || 0;
    var fn;
    var binaryReturnFn = function (y) {
      return chain(fns)(fn(x, y), ++i);
    };
    while (i < fns.length) {
      fn = fns[i];
      if (fn.length === 2) {
        return binaryReturnFn;
      }
      x = fn(x);
      i++;
    }
    return x;
  };
};

},{}],6:[function(require,module,exports){
var printLn = function(str) {
	var p = document.createElement('p');
	var txt = document.createTextNode(str);
	if (str.slice(0, 12) === 'accuracy: 0 ') {
		p.style.backgroundColor = '#EEE';
		p.style.color = '#000';
		p.style.fontWeight = 'bold';
	}
	p.appendChild(txt);
	document.body.appendChild(p);
};
var printHr = function() {
	var hr = document.createElement('hr');
	document.body.appendChild(hr);
};

module.exports = function (population, inputs, desiredOutputs, duration, iterationCount) {
	printLn('duration: ' + duration + 'ms');
	printLn('iterations: ' + iterationCount);
	printHr();
	population.forEach(function(elem){
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
		printHr();
	});
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
var randomIndex = require('../randomIndex.js');
var unaryBaseFunctions = require('../baseFunctions/unaryBaseFunctions');

var mutationProb = 3 / 4;

var objSplice = function(obj, idx, count, e1, e2, e3) {
	obj.libs.splice(idx, count, e1);
	obj.names.splice(idx, count, e2);
	obj.funs.splice(idx, count, e3);
};

var deleteCount = function (parent) {
	var deleteCount = 0;
	while (Math.random() < mutationProb) {
		deleteCount++;
		if (deleteCount >= parent.funs.length - 1) {
			break;
		}
	}
	return deleteCount;
};

module.exports = function (parent) {
	if (Math.random() < mutationProb) {
		var randomFn = randomIndex(unaryBaseFunctions.funs.length);
		//do not splice out the first function (which is binary)
		objSplice(
			parent,
			randomIndex(parent.funs.length - 1) + 1,
			deleteCount(parent),
			'unaryBaseFunctions',
			unaryBaseFunctions.names[randomFn],
			unaryBaseFunctions.funs[randomFn]
		);
	}
	return parent;
};

},{"../baseFunctions/unaryBaseFunctions":4,"../randomIndex.js":8}],10:[function(require,module,exports){
var tinytic = require('tinytic');

var randomElement = require('./lib/randomElement.js');
var applyFitness = require('./lib/applyFitness.js');
var reproduce = require('./lib/reproduction/randomUnaryAdding.js');
var printOutput = require('./lib/printOutput.js');
var Ghost = require('./lib/Ghost.js');

//Initial Population
var i;
var inputs = [];
for (i = 0; i < 8; i++) {
	inputs.push(i);
}
var desiredFunction = function(inputs) {
	return inputs.map(function(elem) {
		return Math.sin(-(Math.pow(elem, 2) - 1) * 2);
	});
};
var desiredOutputs = desiredFunction(inputs);
var duration = 512;
var popSize = duration;
var num = popSize;
var secondArgument = Math.random();
var iterationCount = 0;
var population = [];

while (num--) {
	population[num] = new Ghost();
}
var survivors = population.slice(0);
var newGeneration = function () {
	var child;

	while (population.length < popSize) {
		child = reproduce(randomElement(survivors), randomElement(survivors));
		population.push(child);
	}

	survivors = applyFitness(population, inputs, desiredOutputs, secondArgument);
};
while (tinytic.total() < duration) {
	iterationCount++;
	newGeneration();
}
printOutput(population, inputs, desiredOutputs, duration, iterationCount);

},{"./lib/Ghost.js":1,"./lib/applyFitness.js":2,"./lib/printOutput.js":6,"./lib/randomElement.js":7,"./lib/reproduction/randomUnaryAdding.js":9,"tinytic":11}],11:[function(require,module,exports){
var tinytic = (function() {
	var getNow = Date.now || function() {return new Date().getTime();};

	var t0 = getNow(),
		then = t0,
		now = then;

	var toc = function(maxDT) {
		then = now;
		now = getNow();
		var dT = now - then;
		if (maxDT < dT) {
			return maxDT;
		}
		return dT;
	};

	var total = function(maxDT) {
		var dT = getNow() - t0;
		if (maxDT < dT) {
			return maxDT;
		}
		return dT;
	};

	var reset = function() {
		t0 = then = now = getNow();
	};

	return {
		toc: toc,
		total: total,
		reset: reset
	};
}());

if (typeof module === 'object') {
	module.exports = tinytic;
}

},{}]},{},[10]);
