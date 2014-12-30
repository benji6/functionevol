var randomElement = require('./randomElement.js');
var randomIndex = require('./randomIndex.js');
var unaryBaseFunctions = require('./baseFunctions/unaryBaseFunctions');
var mutationProb = 1 / 3;

var mutate = function(arr0) {
	if (Math.random() < mutationProb) {
		return mutate(arr0.concat({
			lib: 'unaryBaseFunctions',
			fun: randomElement(unaryBaseFunctions)
		}));
	}
	return arr0;
};

module.exports = function (arr0, arr1) {
	//always include at least first element from arr0
	var arr0Sliced = arr0.slice(0, randomIndex(arr0.length));
	//never include the first element of arr1
	var arr1Sliced = arr1.slice(1, randomIndex(arr1.length -1));
	return mutate(mutate(mutate([]).concat(arr0Sliced)).concat(arr1Sliced));
};
