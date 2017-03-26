(function(){
	var controller = function($scope, $log,  $location, redstarCreateTopicService){
		$scope.errorMessage = "";
		$scope.successMessage = "";
		$scope.topicText = "";
		var TOPIC_LENGTH_LIMIT = 255;
		var vm = this;

		// create a topic
		$scope.createTopic = function(){

			if ($scope.topicText.length>TOPIC_LENGTH_LIMIT){
				$scope.errorMessage = "Only 255 characters or less allowed.";
			} else {

				// sets a new topic with the topic text and 0 upvotes and downvotes
				var data = {
					text: $scope.topicText,
					upvotes: 0,
					downvotes: 0
				};

				// create the topic with the help of redstarCreateTopicService
				redstarCreateTopicService.createTopic(data, function(response){
					if (response.success){
						$scope.errorMessage = "";
						$scope.successMessage = "Topic Successfully created!";

						//redirect back to main page
						$location.path('/');
					} else {
						$scope.errorMessage = "Failed to create topic.";
					}
				})
			} 
		};

		// vm.activate = function(){
		// };

		// vm.activate();

	};

	var module = angular.module('redstarMain');
	module.controller('redstarCreateTopicController', ['$scope', '$log',  '$location', 'redstarCreateTopicService', controller]);
})();