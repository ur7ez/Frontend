var myMathRound = Math.round;
var testPack = [
	{
		name: "lieRound",
		func: dashboard.lieRound,
		mock: 'Math.round = function(a) {return a+1};',
		tests: [
			[[1], 2],
			[[3.6], 4.6],
			[[5.99], 6.99]
		]
	},
	{
		name: "leadZero",
		func: dashboard.leadZero,
		tests: [
			[[1], "01"],
			[[3], "03"],
			[[5], "05"],
			[[10], "10"],
			[[30], "30"]
		]
	},
	{
		name: "sum",
		func: dashboard.sum,
		tests: [
			[[-1,1], 0],
			[[2,2], 4],
			[[3,3], 6],
			[[0.1,0.2], 0.3],
			[['1',1], undefined],
			[['a','b'], undefined]
		]
	},
	{
		name: "formatDate",
		func: dashboard.formatDate,
		tests: [
            [[1510138800000], '13:00 at 08-11-2017'],
            [[1510077900000], '20:05 at 07-11-2017'],
            [[1509138000000], '00:00 at 28-10-2017'],
            [[1522385900222], '07:58 at 30-03-2018'],
            [[2034034783628], '04:39 at 16-06-2034']
		]
	},
	{
		name: "formatDateAgo",
		func: dashboard.formatDateAgo,
		mock: 'Math.round = myMathRound;',
		tests: [
            [[1510138800000], '5 days ago'],
            [[1510077900000], '5 days ago'],
            [[1438039931201], '120 weeks ago'],
            [[1248983843682], '432 weeks ago'],
            [[912398238388], '989 weeks ago']
		]
	}
];