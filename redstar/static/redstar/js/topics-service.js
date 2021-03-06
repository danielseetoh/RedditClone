(function(){
	var service = function($log, $http, redstarServerService){

		// gets all the current topics
		var getTopicsData = function(pageNumber, callback){

			if (pageNumber > 0){
				var url = "api/topics/?page="+pageNumber;
			} else {
				var url = "api/topics/";
			}
			// retrieve all the current topics in descending order of upvotes
			$http({
				method: 'GET',
				url: url
			})
			.then(successCallback, errorCallback);

			// on success
			function successCallback(response){
				$log.debug("getTopicsData success");
				callback({
					success: true,
					topicsData: response
				});
			}

			// on error
			function errorCallback(response){
				$log.debug("getTopicsData fail");
				callback({
					success: false,
					topicsData: response
				})
			}
		};

		// upvote topic by id
		var upvoteTopic = function(topicId, callback){
			var url = "api/upvote/" + topicId + "/";

			$http({
				method: 'PATCH',
				url: url,
			})
			.then(successCallback, errorCallback);

			// on success
			function successCallback(response){
				$log.debug("Upvote success");
				callback({
					success: true
				});
			}

			// on error
			function errorCallback(response){
				$log.debug("Upvote fail");
				callback({
					success: false
				})
			}
		};

		// downvote topic by id
		var downvoteTopic = function(topicId, callback){
			var url = "api/downvote/" + topicId + "/";

			$http({
				method: 'PATCH',
				url: url,
			})
			.then(successCallback, errorCallback);

			// on success
			function successCallback(response){
				$log.debug("Downvote success");
				callback({
					success: true
				});
			}

			// on error
			function errorCallback(response){
				$log.debug("Downvote fail");
				callback({
					success: false
				})
			}
		};

		var getNumPages = function(callback){
			var url = "api/topics/numPages/";

			$http({
				method: 'GET',
				url: url,
			})
			.then(successCallback, errorCallback);

			// on success
			function successCallback(response){
				$log.debug("getNumPages success");
				callback({
					success: true,
					numPages: response.data
				});
			}

			// on error
			function errorCallback(response){
				$log.debug("getNumPages fail");
				callback({
					success: false,
					numPages: response.data
				})
			}
		}


		// exposed functions as part of this service
		return {
			getTopicsData: getTopicsData,
			upvoteTopic: upvoteTopic,
			downvoteTopic: downvoteTopic,
			getNumPages: getNumPages
		}

	};

	var module = angular.module('redstarMain');
	module.factory('redstarTopicsService', ['$log', '$http', 'redstarServerService', service]);
})();