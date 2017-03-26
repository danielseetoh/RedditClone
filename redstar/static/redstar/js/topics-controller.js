(function(){
	var controller = function($scope, $log, $location, redstarTopicsService){
		$scope.topicsData = {};
		$scope.errorMessage = "";
		var vm = this;

		vm.activate = function(){
			getTopicsData();
		};

		// upvote a topic
		$scope.upvote = function(topicId){
			$log.debug(topicId);
			redstarTopicsService.upvoteTopic(topicId, function(response){
				if(response.success){
					getTopicsData();
					$scope.errorMessage = "";
				} else {
					$scope.errorMessage = "Unable to upvote topic.";
				}
			})
		}

		// downvote a topic
		$scope.downvote = function(topicId){
			$log.debug(topicId);
			redstarTopicsService.downvoteTopic(topicId, function(response){
				if(response.success){
					getTopicsData();
					$scope.errorMessage = "";
				} else {
					$scope.errorMessage = "Unable to downvote topic.";
				}
			})
		}

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