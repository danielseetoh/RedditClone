(function(){
	var service = function($log, $http){

		// creates a new topic
		var createTopic = function(data, callback){

			var url = "api/topics/";

			// sends the data over to the server to create a new topic
			$http({
				method: 'POST',
				url: url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest: formURLEncode,
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

		// encode the data with content type application/x-www-form-urlencoded
		var formURLEncode = function(obj) {
	        var str = [];
	        for(var p in obj)
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	        return str.join("&");
	    };

	    // exposes these functions as part of this service
		return {
			createTopic: createTopic,
			formURLEncode: formURLEncode
		};

	};

	var module = angular.module('redstarMain');
	module.factory('redstarCreateTopicService', ['$log', '$http', service]);
})();