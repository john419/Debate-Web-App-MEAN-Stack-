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
	createRoom(){
//		console.log("???3");
		this.mRoomIndex++;
//		console.log("방만들기 : " + this.mRoomIndex);
		this.mChatRoomList[this.mRoomIndex+""] = new ChatRoom();
//		console.log(this.mChatRoomList["1"]);
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
//		console.log("1");
//		console.log(this.mChatRoomList[room_id]);
		if(this.mChatRoomList[room_id] == undefined)
			socket.emit('reslt_join', false);
		this.mChatRoomList[room_id].addUser(socket,TF);
	}

	test(socket){
		socket.emit('welcom',"abc");
	}
}

console.log("???2");

var ChatRoomHolder = new _ChatRoomHolder();
ChatRoomHolder.createRoom();

module.exports = ChatRoomHolder;