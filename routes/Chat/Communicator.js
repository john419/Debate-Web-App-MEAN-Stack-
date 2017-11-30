class Communicator {
	constructor(){
		this.mAgreeUser = [];		// 찬성측 유저 (Socket 저장)
		this.mDisAgreeUser = [];	// 반대측 유저 (Socket 저장)
	}

	addSocket(socket, TF){
		if(TF){
			this.mAgreeUser.push(socket);
		}
		else {
			this.mDisAgreeUser.push(socket);			
		}
	}

	broadCast(TF ,event, msg){

		var array;

		if(TF)
			array = this.mAgreeUser;
		else
			array = this.mDisAgreeUser;

		for(var i=0;i<array.length;i++)
			array[i].emit(event,msg);


	}
}