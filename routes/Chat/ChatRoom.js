'use strict'

var Rule = require("./Rule/Rule.js");
var app = require("../../app.js");

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

		this.mRule = new Rule(); //규칙에 대한 정의 Rule 클래스의 객체

		this.mAgreeUser = []; //찬성측 유저 (Socket 저장)
		this.mDisAgreeUser = []; //반대측 유저 (Socket 저장)
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
		
		if(TF == true){
			//찬성 측에 추가
			if(this._CanAddAgreeUser()){
				this.mAgreeUser.push("abc");
				// 추가
				// 모든 유저에게 접속 했다고 알림. 새로 추가된 사람에겐 안보냄
//				for(i=0; i<this.mAgreeUser.length; i++)
//					app.io.emit(this.mAgreeUser);

				app.io.to(socket.id).emit('welcom',"abc");

				// 추가된 유저에게 모든 유저 정보를 줌.

			} else {

			}
		} else {
			//반대 측에 추가
			if(this._CanAddDisAgreeUser()){
				//추가
			} else {

			}
		}
	}
	/*
		지금 찬성측에 유저를 추가 할 수 있는지
		결과
		할 수 있으면, true
		할 수 없으면, false
	*/
	_CanAddAgreeUser(){
		if(this.mAgreeUser.length < this.mRule.getMaxAgreeUserNum()){
			return true;
		} else {
			return false;
		}
	}
	/*
		지금 반대측에 유저를 추가 할 수 있는지
		결과
		할 수 있으면, true
		할 수 없으면, false
	*/
	_CanAddDisAgreeUser(){
		if(this.mDisAgreeUser.length < this.mRule.getMaxDisAgreeUserNum()){
			return true;
		} else {
			return false;
		}
	}
}

module.exports = ChatRoom;