	var printLn = function(str) {
	var p = document.createElement('p');
	var txt = document.createTextNode(str);
	if (str.slice(0, 12) === 'accuracy: 0 ') {
		p.style.backgroundColor = '#EEE';
		p.style.color = '#000';
		p.style.fontWeight = 'bold';
	}
	p.appendChild(txt);
	document.body.appendChild(p);
};
var printHr = function() {
	var hr = document.createElement('hr');
	document.body.appendChild(hr);
};

module.exports = function (population, inputs, desiredOutputs, duration, iterationCount) {
	printLn('duration: ' + duration + 'ms');
	printLn('iterations: ' + iterationCount);
	printHr();
	population.forEach(function(elem){
		elem.computeFns();
		printLn(elem.names.toString());
		printLn('length: ' + elem.fns.length);
		printLn('inputs: ' + inputs);
		printLn('outputs: ' + elem.outputs);
		printLn('desired outputs: ' + desiredOutputs);
		printLn(
			'accuracy: ' +
			elem.accuracy +
			' (0 is optimal, greater number correlates to greater inaccuracy)'
		);
		printHr();
	});
};
