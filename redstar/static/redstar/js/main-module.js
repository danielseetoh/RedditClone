(function(){
	var app = angular.module('redstar-main', ['ngRoute']);

	var controller = function($scope, $log){
		var vm = this;

		vm.activate = function(){
		};
	};

	app.config(function($locationProvider) {
	    $locationProvider.html5Mode(true);
	});

	app.config(function($routeProvider, $locationProvider){
		$routeProvider
		.when("/", {
			templateUrl: "static/redstar/templates/topics.html"
		})
		.when("/submit", {
			templateUrl: "static/redstar/templates/submit.html"
		})
	})

	app.controller('RedstarMainController', ['$scope', '$log', controller]);
})();