var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http){

	$scope.click = function(roomid){

		console.log(roomid);

		$http({
			method: 'POST',
			url: '/JoinRoom',
			data : { room_id : roomid }
		}).then(function successCallback(response) {
			console.log(response);
			
			window.location = response.data;
			// this callback will be called asynchronously
			// when the response is available
		}, function errorCallback(response) {
			console.log(response);
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});


	}
})