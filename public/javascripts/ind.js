var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope){

	$scope.msg="abc";
	$scope.chatLog="";

	$scope.true_user=[];
	$scope.false_user=[];

	var socket = io();

	var finish_join;

//	sessionStorage.setItem('mySocket', socket);

//	window.location = "http://localhost:3000/2"

	$scope.click = function(){

		finish_join = false;
		socket.emit('join_room',"1",true);

//		while(finish_join == false){ }

		$scope.msg="";
	}

	$scope.clickd = function(){

		finish_join = false;
		socket.emit('join_room',"1",false);

//		while(finish_join == false){ }

		$scope.msg="";
	}

	socket.on('result_join', function(data){
		
		console.log("test");
		console.log(data.result);

		if(data.result == true){
			console.log("test");
			console.log(data.result);
			console.log(data.agree_user_num);
			console.log(data.dis_agree_user_num);
			console.log(data.user_index);
			console.log(data.user_type);
			
			for(var i=0;i<data.agree_user_num;i++){
				$scope.true_user.push("AUser" + i);
				$scope.$apply();
			}
			for(var i=0;i<data.dis_agree_user_num;i++){
				$scope.false_user.push("DUser" + i);
				$scope.$apply();
			}
		}

		finish_join = true;
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
			$scope.chatLog = "start";
		} else {
			$scope.chatLog = $scope.chatLog + "\n" + "other";			
		}

		$scope.$apply();
	});

})