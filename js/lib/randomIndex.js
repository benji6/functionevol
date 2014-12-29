module.exports = function (arrLen) {
	if (arrLen && arrLen.length) {
		arrLen = arrLen.length;
	}
	return Math.floor(Math.random() * arrLen);
};
