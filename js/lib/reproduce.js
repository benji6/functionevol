var randomElement = require('./randomElement.js');
var randomIndex = require('./randomIndex.js');
var unaryBaseFunctions = require('./baseFunctions/unaryBaseFunctions');
var mutationProb = 1 / 3;

//dev would be great to evolve this module
//dev self optimisation by checking if there exists a pair of functions
//which can be spliced out
//dev randomly insert function

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
