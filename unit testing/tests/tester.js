var tester = {};

tester.test = function(f, args, result, mock) {
	if(mock) {
		eval(mock);
	}
	return tester.equal(f.apply(null, args), result);
};

tester.equal = function(entity1, entity2) {
	return JSON.stringify(entity1) == JSON.stringify(entity2);
};

tester.run = function(testList) {
	for(var i = 0; i < testList.length; i++) {
		var passed = 0,
			failed = 0,
			failedInfo = [];
			mock = testList[i].mock || null;
		for(var j = 0; j < testList[i].tests.length; j++) {
			if(tester.test(testList[i].func, testList[i].tests[j][0], testList[i].tests[j][1], mock)) {
				passed++;
			} else {
				failed++;
				failedInfo.push('Test #' + (j + 1) + ' failed:\n' +
					'- give: ' + testList[i].tests[j][0] + '\n' +
					'- get: ' + testList[i].func.apply(null, testList[i].tests[j][0]) + '\n' +
					'- expected: ' + testList[i].tests[j][1]);
			}
		}
		var color = failed > 0 ? '#f22' : 'lime';
		console.log('%c-------------\nTests for ' + testList[i].name, 'font-weight:700;color:'+color+';background:#000');
		console.log('Tests: total = ' + testList[i].tests.length + ';' +
			' passed = ' + passed + ';'+
			' failed = ' + failed);
		console.log(failedInfo.join('\n___\n'));
	}
};