var ChatRoom = require("./ChatRoom.js");

var app = require("../../app.js");

class _ChatRoomHolder {

	constructor(){
		this.mChatRoomList = [];
		this.mRoomIndex = 0;
	}

	/*
		방 만들기
		파라미터
			없음

		결과
			방 생성 후, 인덱스 반환
	*/
	createRoom2(subject, ruleIndex){
		console.log(ruleIndex);
		this.mRoomIndex = this.mRoomIndex + 1;
		this.mChatRoomList[this.mRoomIndex+""] = new ChatRoom(this.mRoomIndex, subject, ruleIndex);
		return this.mRoomIndex + "";
	}
	/*
		방 참가
		파라미터
			room_id(string) : 방 고유 id
			socket(socket) : 윶의 socket 정보
			TF(boolean) : 유저가 찬성 측 인지, 반대 측 인지
		
		결과
			없음. 실패의 경우 ChatRoom객체가 실패 메시지를 모냄.
	*/
	joinRoom(room_id, socket, TF){
		if(this.mChatRoomList[room_id] == undefined)
			socket.emit('reslt_join', false);
		this.mChatRoomList[room_id].addUser(socket,TF);
	}

   getRoomList(){
      var roomList = new Array();
      for(var i = 1; i<=this.mRoomIndex; i++){
         var room = new Object();
         room.id = i;
         room.title = this.mChatRoomList[i].mTitle;
         room.subject = this.mChatRoomList[i].mSubject;
         room.agreeNum = this.mChatRoomList[i].mCommunicator.getUserNum(true);
         room.disagreeNum  = this.mChatRoomList[i].mCommunicator.getUserNum(false);
         
         roomList.push(room);
      }
      return roomList;
   }

	getMsg(room_id, user, type, msg){
		this.mChatRoomList[room_id].getMsg(user, type, msg);
	}
}

var ChatRoomHolder = new _ChatRoomHolder();

module.exports = ChatRoomHolder;