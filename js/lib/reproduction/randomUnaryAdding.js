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
