(function() {
	const app = angular.module('workoutlog', [
		'ui.router',
		'workoutlog.define',
		'workoutlog.logs',
		'workoutlog.history',
		'workoutlog.feed',
		'workoutlog.auth.signup',
		'workoutlog.auth.signin'
	])
	.factory('socket', function(socketFactory){
		let myIoSocket = io.connect('http://localhost:3000');
		let socket = socketFactory({
			ioSocket: myIoSocket
		});
		return socket;
	});

	function config($urlRouterProvider) {
		$urlRouterProvider.otherwise('/signin');
	}

	config.$inject = ['$urlRouterProvider'];
	app.config(config);

	const API_BASE = location.hostname === "localhost" ? "//localhost:3000/api/" : "//cool-aarons-api.herokuapp.com/api/";
	app.constant('API_BASE', API_BASE);
})();