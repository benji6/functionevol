var randomIndex = require('./randomIndex.js');

module.exports = function (arr0, arr1) {
	arr0.splice(randomIndex(arr0) + 1);
	arr1.splice(randomIndex(arr1) + 1);
	return arr0.concat(arr1);
};
