var printLn = function(str) {
	var p = document.createElement('p');
	var txt = document.createTextNode(str);
	if (str === 'accuracy: 0') {
		p.style.color = red;
	}
	p.appendChild(txt);
	document.body.appendChild(p);
};

module.exports = function (population, inputs, desiredOutputs, timeElapsed) {
	var num = population.length;
	var elem;
	printLn('time elapsed: ' + timeElapsed + 'ms');
	//backwards loop so best results display first
	while (num--) {
		elem = population[num];
		printLn(elem.names.toString());
		printLn('length: ' + elem.funs.length);
		printLn('inputs: ' + inputs);
		printLn('outputs: ' + elem.outputs);
		printLn('desired outputs: ' + desiredOutputs);
		printLn(
			'accuracy: ' +
			elem.accuracy +
			' (0 is optimal, greater number correlates to greater inaccuracy)'
		);
		printLn('/////////////////////');
	}
};
