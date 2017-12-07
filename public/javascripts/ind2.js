var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope){

	$scope.msg="abc";
	$scope.chatLog="";

	var socket = io();

	console.log(socket);

	$scope.click = function(){
	 	socket.emit('join_room',"1",true);

		$scope.msg="";
	}

	socket.on('welcom', function(data){
		console.log("test");

		$scope.chatLog = $scope.chatLog + data + '\n';
		console.log($scope.chatLog);

	});

})