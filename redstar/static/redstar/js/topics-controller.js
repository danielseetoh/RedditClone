(function(){
	var controller = function($scope, $log, $location, $route, redstarTopicsService){
		$scope.topicsData = {};
		$scope.numPages = 0;
		$scope.pageNumber = 0;
		$scope.errorMessage = "";
		var vm = this;

		vm.activate = function(){
			getTopicsData();
			getNumPages();
		};

		// upvote a topic
		$scope.upvote = function(topicId){
			$log.debug(topicId);
			redstarTopicsService.upvoteTopic(topicId, function(response){
				if(response.success){
					$route.reload();
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
					$route.reload();
					$scope.errorMessage = "";
				} else {
					$scope.errorMessage = "Unable to downvote topic.";
				}
			})
		}

		// get number of pages total
		function getNumPages(){
			redstarTopicsService.getNumPages(function(response){
				if (response.success){
					var list = []
					for (var i = 1; i <= response.numPages.data; i++){
						list.push(i);
					}
					$scope.numPages = list;
					$scope.errorMessage = "";
				} else {
					$scope.errorMessage = "Unable to retrieve pages from server.";
				}
			})
		}

		// get all topics and their corresponding data from the server
		function getTopicsData(){
			redstarTopicsService.getTopicsData($scope.pageNumber, function(response){
				if (response.success){
					$scope.topicsData = response.topicsData.data.results;
					$scope.errorMessage = "";
				} else {
					$scope.errorMessage = "Unable to retrieve data from server.";
				}
			});
		}

		// set the new page number and retrieve the topics accordingly
		$scope.setPageNumber = function(pageNumber){
			$scope.pageNumber = pageNumber;
			getTopicsData();
		}

		vm.activate();

	};

	var module = angular.module('redstarMain');
	module.controller('redstarTopicsController', ['$scope', '$log', '$location', '$route', 'redstarTopicsService', controller]);
})();