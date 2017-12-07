var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope){

	var myIndex;
	var myType;

	$scope.debateChat = "";

	$scope.true_user=[];
	$scope.false_user=[];

	$scope.my = "User";

	var socket = io();
	socket.emit('join_room',roomNum,userType);


	socket.on('result_join', function(data){

		console.log(data);

		if(data.user_type){
			$scope.my = "A" + $scope.my + data.agree_user_num;
			myType = data.user_type;
			myIndex = data.agree_user_num;
		}
		else{
			$scope.my = "D" + $scope.my + data.dis_agree_user_num;
			myType = data.user_type;
			myIndex = data.agree_user_num;
		}

		if(data.result == true){
			for(var i=1;i<=data.agree_user_num;i++){
				$scope.true_user.push("AUser" + i);
				$scope.$apply();
			}

			for(var i=1;i<=data.dis_agree_user_num;i++){
				$scope.false_user.push("DUser" + i);
				$scope.$apply();
			}
		}
	});

	socket.on('other_join_room', function(data) {
		if(data.user_type == true)
			$scope.true_user.push("AUser" + data.user_index);
		else
			$scope.false_user.push("DUser" + data.user_index);
		$scope.$apply();
	});

	socket.on('action', function(data) {
		
		if(data.action === 'start'){
			$scope.debateChat = "start";
		} else if(data.action === "speak") {
			if(data.user_index == myIndex && data.user_type == myType){
				$scope.debateChat = $scope.debateChat + "\n" + "my Turn";
			} else {
				$scope.debateChat = $scope.debateChat + "\n" + "not my Turn";				
			}
		} else {
			$scope.debateChat = $scope.debateChat + "\n" + "other";			
		}

		$scope.$apply();
	});})