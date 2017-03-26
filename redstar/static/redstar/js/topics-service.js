(function(){
	var service = function($log, $http){

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

		// exposed functions as part of this service
		return {
			getTopicsData: getTopicsData
		}

	};

	var module = angular.module('redstarMain');
	module.factory('redstarTopicsService', ['$log', '$http', service]);
})();