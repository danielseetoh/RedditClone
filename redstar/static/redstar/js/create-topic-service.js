(function(){
	var service = function($log, $http, redstarServerService){

		// creates a new topic
		var createTopic = function(data, callback){

			var url = "api/topics/";

			// sends the data over to the server to create a new topic
			$http({
				method: 'POST',
				url: url,
				headers: redstarServerService.header,
			    transformRequest: redstarServerService.formURLEncode,
			    data: data
			})
			.then(successCallback, errorCallback);

			// on success
			function successCallback(response){
				$log.debug("createTopic success");
				callback({
					success:true
				});
			}

			// on error
			function errorCallback(response){
				$log.debug("createTopic fail");
				callback({
					success:false
				})
			}

		};


	    // exposes these functions as part of this service
		return {
			createTopic: createTopic
		};

	};

	var module = angular.module('redstarMain');
	module.factory('redstarCreateTopicService', ['$log', '$http', 'redstarServerService', service]);
})();