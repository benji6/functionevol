var randomIndex = require('./randomIndex');

module.exports = function (arr) {
	return arr[randomIndex(arr.length)];
};
