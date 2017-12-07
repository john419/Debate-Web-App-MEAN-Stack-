class Communicator {
	constructor(){
		this.mAgreeUser = [];		// 찬성측 유저 (Socket 저장)
		this.mDisAgreeUser = [];	// 반대측 유저 (Socket 저장)
	}

	getUserNum(TF){
		if(TF)
			return this.mAgreeUser.length;
		else
			return this.mDisAgreeUser.length;
	}

	addSocket(socket, TF){
		if(TF)
			this.mAgreeUser.push(socket);
		else
			this.mDisAgreeUser.push(socket);
	}

	broadCast(TF ,event, data){

		var array;

		if(TF)
			array = this.mAgreeUser;
		else
			array = this.mDisAgreeUser;

		for(var i=0;i<array.length;i++)
			array[i].emit(event,data);

	}

	sendMsg(TF, index, event, data){
		if(TF)
			this.mAgreeUser[index].emit(event, data);
		else
			this.mDisAgreeUser[index].emit(event, data);
	}
}

module.exports = Communicator;