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
	arr0.splice(randomIndex(arr0.length) + 1);
	//include any sub array of arr1
	arr1.splice(randomIndex(arr1.length));
	return mutate(mutate(mutate([]).concat(arr0)).concat(arr1));
};
