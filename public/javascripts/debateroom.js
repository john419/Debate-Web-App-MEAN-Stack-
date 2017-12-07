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

		if(data.result == true){

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

			for(var i=1;i<=data.agree_user_num;i++){
				$scope.true_user.push("AUser" + i);
			}

			for(var i=1;i<=data.dis_agree_user_num;i++){
				$scope.false_user.push("DUser" + i);
			}
			$scope.$apply();
		} else {
			alert("방에 입장하지 못 하였습니다.")
			window.location = '/main';
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
		} else if(data.action === "wait") {
			
			$scope.debateChat = $scope.debateChat + "wait" + "\n";

			document.getElementById("inputDebate").disabled = true;
			document.getElementById("inputDebateBtn").disabled = true;

		} else if(data.action === "vote") {

			user_data = {
				index : myIndex,
				type : userType
			}

			$scope.debateChat = $scope.debateChat + "결과" + "\n";

			document.getElementById("inputDebate").disabled = true;
			document.getElementById("inputDebateBtn").disabled = true;

			msg = "안건에 찬성 하십니까?";
			if (confirm(msg)!=0) {
				socket.emit('vote',roomNum,user_data,true);
			} else {
				socket.emit('vote',roomNum,user_data,false);
			}
		} else {
			$scope.debateChat = $scope.debateChat + "other" + "\n" ;
		}

		document.getElementById("allChat").scrollTop = document.getElementById("allChat").scrollHeight;
		document.getElementById("memChat").scrollTop = document.getElementById("memChat").scrollHeight;

		$scope.$apply();
	});

	socket.on('team_chat', function(data) {
		$scope.teamChat = $scope.teamChat + data + "\n" ;

		document.getElementById("allChat").scrollTop = document.getElementById("allChat").scrollHeight;
		document.getElementById("memChat").scrollTop = document.getElementById("memChat").scrollHeight;
		$scope.$apply();
	})

	socket.on('debate_chat', function(data) {
		$scope.debateChat = $scope.debateChat + data + "\n" ;

		document.getElementById("allChat").scrollTop = document.getElementById("allChat").scrollHeight;
		document.getElementById("memChat").scrollTop = document.getElementById("memChat").scrollHeight;
		$scope.$apply();
	})

	socket.on('vote_result', function(data) {

		$scope.debateChat = $scope.debateChat + "찬성 : " + data.true + "\n" ;
		$scope.debateChat = $scope.debateChat + "반대 : " + data.false + "\n" ;

		document.getElementById("allChat").scrollTop = document.getElementById("allChat").scrollHeight;
		document.getElementById("memChat").scrollTop = document.getElementById("memChat").scrollHeight;

		$scope.$apply();

	})
})