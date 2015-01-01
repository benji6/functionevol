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
var objSlice = function(obj, fr, to) {
	return {
		libs: obj.libs.slice(0, to),
		names: obj.names.slice(0, to),
		funs: obj.funs.slice(0, to)
	};
};
var objConcat = function(obj0, obj1) {
	return {
		libs: obj0.libs.concat(obj1.libs),
		names: obj0.names.concat(obj1.names),
		funs: obj0.funs.concat(obj1.funs)
	};
};
module.exports = function (obj0, obj1) {
	//always include at least first element from arr0
	var child = objSlice(obj0, 0, randomIndex(obj0.funs.length - 1) + 1);
	var mutantChild = mutate(child);
	//never include the first element of arr1
	objConcat(mutantChild, objSlice(obj1, 1, randomIndex(obj1.funs.length - 1)));

	return mutate(mutantChild);
};
