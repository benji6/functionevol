var randomElement = require('./randomElement.js');
var unaryBaseFunctions = require('./baseFunctions/unaryBaseFunctions');
var mutationProb = 1 / 2;

var mutate = function(arr0) {
	if (Math.random() < mutationProb) {
		return mutate(arr0.concat(randomElement(unaryBaseFunctions)));
	}
	return arr0;
}

module.exports = function (arr0, arr1) {
	arr0.splice(randomElement(arr0) + 1);
	arr1.splice(randomElement(arr1) + 1);
	var mutatedArr0 = mutate(arr0);
	return mutatedArr0.concat(arr1);
};
