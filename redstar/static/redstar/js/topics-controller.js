(function(){
	var controller = function($scope, $log, $location, redstarTopicsService){
		$scope.topicsData = {};
		$scope.errorMessage = "";
		var vm = this;

		vm.activate = function(){
			getTopicsData();
		};

		// get all topics and their corresponding data from the server
		function getTopicsData(){
			redstarTopicsService.getTopicsData(function(response){
				if (response.success){
					$scope.topicsData = response.topicsData.data.results;
					$scope.errorMessage = "";
					
				} else {
					$scope.errorMessage = "Unable to retrieve data from server.";
				}
			});
		}

		vm.activate();

	};

	var module = angular.module('redstarMain');
	module.controller('redstarTopicsController', ['$scope', '$log', '$location', 'redstarTopicsService', controller]);
})();