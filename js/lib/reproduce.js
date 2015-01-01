var randomElement = require('./randomElement.js');
var randomIndex = require('./randomIndex.js');
var unaryBaseFunctions = require('./baseFunctions/unaryBaseFunctions');
var mutationProb = 1 / 3;

var mutate = function(obj) {
	if (Math.random() < mutationProb) {
		var randomFn = randomIndex(unaryBaseFunctions.funs.length);
		obj.libs.push('unaryBaseFunctions');
		obj.names.push(unaryBaseFunctions.names[randomFn]);
		obj.funs.push(unaryBaseFunctions.funs[randomFn]);

		return mutate(obj);
	}
	return obj;
};

module.exports = function (obj0, obj1) {
	//always include at least first element from arr0
	var randomIndex0 = randomIndex(obj0.funs.length - 1) + 1;
	var libs0Sliced = obj0.libs.slice(0, randomIndex0);
	var names0Sliced = obj0.names.slice(0, randomIndex0);
	var funs0Sliced = obj0.funs.slice(0, randomIndex0);
	//never include the first element of arr1
	var randomIndex1 = randomIndex(obj1.funs.length - 1);
	var libs1Sliced = obj1.libs.slice(1, randomIndex1);
	var names1Sliced = obj1.names.slice(1, randomIndex1);
	var funs1Sliced = obj1.funs.slice(1, randomIndex1);

	var child = {
		libs: libs0Sliced,
		names: names0Sliced,
		funs: funs0Sliced
	};

	var mutantChild = mutate(child);

	mutantChild.libs = mutantChild.libs.concat(libs1Sliced);
	mutantChild.names = mutantChild.names.concat(names1Sliced);
	mutantChild.funs = mutantChild.funs.concat(funs1Sliced);

	return mutate(mutantChild);
};
