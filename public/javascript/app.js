(function() {
	'use strict';
	angular.module('app', ['ui.router','ngMaterial'])
	.config(Config);
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
