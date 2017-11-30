'use strict'

var RuleLauncther = require("./Rule/RuleLauncther.js");
var Rule = require("./Rule/Rule.js");
var Communicator = require("./Communicator.js");
/* 
	과거(ES5)에는 CLASS를 이렇게 정의함.
*/
// function User() {
// 	this.people = 1;
// }

// User.prototype = {
// 	getpeople : function(){
// 		return this.people;
// 	}
// };

/*
	ES6 부터 지원되는 형식
*/

class ChatRoom{
	constructor() {
		this.mRoomID; // 방의 공유 ID(Int)
		this.mSubject; // 주제(String)

		this.mCommunicator = new Communicator();

		this.mRule = new Rule(); //규칙에 대한 정의 Rule 클래스의 객체
		this.mRuleLauncther = new RuleLauncther(this.mRule, this.mCommunicator);
	}
	/*
		파라미터
			socket(socket) : 윶의 socket 정보
			TF(boolean) : 유저가 찬성 측 인지, 반대 측 인지

		result
			추가에 성공 하면, true를 소켓을 통해 전송
			추가에 실패 하면, false를 소켓을 통해 전송
			return 자채는 없음.
	*/
	addUser(socket, TF){
		
		var data = { };

		console.log("addUser");
		console.log(this._CanAddUser(TF));

		if(this._CanAddUser(TF)){
			
			data.user_index = this.mCommunicator.getUserNum(TF);
			data.user_type = TF;

			// 추가
			this.mCommunicator.broadCast(true,'other_join_room',data);
			this.mCommunicator.broadCast(false,'other_join_room',data);

			this.mCommunicator.addSocket(socket, TF);

			data.agree_user_num = this.mCommunicator.getUserNum(true);
			data.dis_agree_user_num = this.mCommunicator.getUserNum(false);
			data.result = true;

			this.mCommunicator.sendMsg(TF, data.user_index, 'result_join', data);

		} else {
			// 추가 거부
			data.result = false;
			socket.emit('result_join', data);
		}

		if(this._isMax()){
			//시작
			this.mRuleLauncther.start();
		}
	}
	_isMax(){
		if(this._CanAddUser(false) == false && this._CanAddUser(true) == false)
			return true;
		return false;
	}
	/*
		지금 찬성측에 유저를 추가 할 수 있는지
		결과
		할 수 있으면, true
		할 수 없으면, false
	*/
	_CanAddUser(TF){
		if(this.mCommunicator.getUserNum(TF) < this.mRule.getMaxUserNum(TF))
			return true;
		else
			return false;
	}
}

module.exports = ChatRoom;