(function(){
	var service = function($log, $http, redstarServerService){

		// gets all the current topics
		var getTopicsData = function(callback){

			var url = "api/topics/";

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
					success:true,
					topicsData:response
				});
			}

			// on error
			function errorCallback(response){
				$log.debug("getTopicsData fail");
				callback({
					success:false,
					topicsData:response
				})
			}
		};

		// upvote topic by id
		var upvoteTopic = function(topicId, callback){
			var url = "upvote/" + topicId + "/";

			$http({
				method: 'PATCH',
				url: url,
			})
			.then(successCallback, errorCallback);

			// on success
			function successCallback(response){
				$log.debug("Upvote success");
				callback({
					success:true
				});
			}

			// on error
			function errorCallback(response){
				$log.debug("Upvote fail");
				callback({
					success:false
				})
			}
		};

		// downvote topic by id
		var downvoteTopic = function(topicId, callback){
			var url = "downvote/" + topicId + "/";

			$http({
				method: 'PATCH',
				url: url,
			})
			.then(successCallback, errorCallback);

			// on success
			function successCallback(response){
				$log.debug("Downvote success");
				callback({
					success:true
				});
			}

			// on error
			function errorCallback(response){
				$log.debug("Downvote fail");
				callback({
					success:false
				})
			}
		};




		// exposed functions as part of this service
		return {
			getTopicsData: getTopicsData,
			upvoteTopic: upvoteTopic,
			downvoteTopic: downvoteTopic
		}

	};

	var module = angular.module('redstarMain');
	module.factory('redstarTopicsService', ['$log', '$http', 'redstarServerService', service]);
})();