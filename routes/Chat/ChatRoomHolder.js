var ChatRoom = require("./ChatRoom.js");

var app = require("../../app.js");

class _ChatRoomHolder {
	constractor(){
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
		this.mRoomIndex++;
		this.mChatRoomList[mRoomIndex+""] = new ChatRoom();
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
		this.mChatRoomList[room_id].addUser(socket.TF)
	}

	test(socket){
		socket.emit('welcom',"abc");
	}
}

var ChatRoomHolder = new _ChatRoomHolder();

module.exports = ChatRoomHolder;