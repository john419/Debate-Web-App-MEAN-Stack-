var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope){

	var myIndex;

	$scope.debateChat = "";
	$scope.teamChat = "";

	$scope.inputTeamChat = "";
	$scope.inputDebateChat = "";

	$scope.true_user=[];
	$scope.false_user=[];

	$scope.my = "User";

	var socket = io();
	socket.emit('join_room',roomNum,userType);

	$scope.sendTeamChat = function(){
		user_data = {
			index : myIndex,
			type : userType
		}

		socket.emit('send_message',roomNum,user_data,'team',$scope.inputTeamChat);
	}

	$scope.sendDebateChat = function(){
		user_data = {
			index : myIndex,
			type : userType
		}

		socket.emit('send_message',roomNum,user_data,'debate',$scope.inputDebateChat);
	}

	socket.on('result_join', function(data){

		if(data.user_type){
			$scope.my = "A" + $scope.my + data.agree_user_num;
			myType = data.user_type;
			myIndex = data.agree_user_num;
		}
		else{
			$scope.my = "D" + $scope.my + data.dis_agree_user_num;
			myType = data.user_type;
			myIndex = data.dis_agree_user_num;
		}

		if(data.result == true){
			for(var i=1;i<=data.agree_user_num;i++){
				$scope.true_user.push("AUser" + i);
			}

			for(var i=1;i<=data.dis_agree_user_num;i++){
				$scope.false_user.push("DUser" + i);
			}
			$scope.$apply();
		}
	});

	socket.on('other_join_room', function(data) {
		if(data.user_type == true)
			$scope.true_user.push("AUser" + data.user_index + 1);
		else
			$scope.false_user.push("DUser" + data.user_index + 1);
		$scope.$apply();
	});

	socket.on('action', function(data) {
		
		console.log(myIndex);

		if(data.action === 'start'){
			$scope.debateChat = "start\n";
		} else if(data.action === "speak") {
			
			$scope.debateChat = $scope.debateChat + data.name + "\n";

			if(data.type == true){
				$scope.debateChat = $scope.debateChat + "AUser" + data.user + "\n";
			}
			else{
				$scope.debateChat = $scope.debateChat + "DUser" + data.user + "\n";
			}

			if(data.user == myIndex && data.type == myType){
				document.getElementById("inputDebate").disabled = false;
				document.getElementById("inputDebateBtn").disabled = false;
			} else {
				document.getElementById("inputDebate").disabled = true;
				document.getElementById("inputDebateBtn").disabled = true;
			}
		} else {
			$scope.debateChat = $scope.debateChat + "other" + "\n" ;
		}

		$scope.$apply();
	});

	socket.on('team_chat', function(data) {
		$scope.teamChat = $scope.teamChat + data + "\n" ;
		$scope.$apply();
	})

	socket.on('debate_chat', function(data) {
		$scope.debateChat = $scope.debateChat + data + "\n" ;
		$scope.$apply();
	})
})