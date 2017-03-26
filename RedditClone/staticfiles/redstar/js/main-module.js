(function(){
	var app = angular.module('redstarMain', ['ngRoute']);

	var controller = function($scope, $log){
		var vm = this;
	};

	// application configuration, enables things such as $log.debug and removes the need for django's csrf_token by using angular's
	app.config(function($locationProvider, $logProvider, $httpProvider) {
	    $locationProvider.html5Mode(true);
	    $logProvider.debugEnabled(true)
	    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	});

	// routing on the client side
	app.config(function($routeProvider, $locationProvider){
		$routeProvider
		.when("/", {
			templateUrl: "static/redstar/templates/topics.html",
			controller: "redstarTopicsController"
		})
		.when("/topics", {
			templateUrl: "static/redstar/templates/topics.html",
			controller: "redstarTopicsController"
		})
		.when("/createTopic", {
			templateUrl: "static/redstar/templates/createTopic.html",
			controller: "redstarCreateTopicController"
		})
		.otherwise({
			templateUrl: "static/redstar/templates/topics.html",
			controller: "redstarTopicsController"
		})
	})

	app.controller('redstarMainController', ['$scope', '$log', controller]);
})();