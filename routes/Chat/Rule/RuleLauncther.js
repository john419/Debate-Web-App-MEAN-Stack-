
class RuleLauncther {
	constructor(rule, communicator){
		this.mRule = rule;
		this.mCommunictor = communicator;

		this.speaker_type;
		this.speaker_index;
	}

	start(){
		var chain = Promise.resolve();

		//토론 시작을 알림.
		var data = {};
		data.action = 'start';

		console.log("talk start");
		this.mCommunictor.broadCast(true, 'action', data);
		this.mCommunictor.broadCast(false, 'action', data);

		for(var i=0;i<this.mRule.getRuleSize();i++){
			chain = chain.then(this.launch(i,this));
		}
	}

	launch(index, data){
		console.log("debug");
		var rule = data.mRule.getRuleInfo(index);
		console.log("debug");

		var chain2 = Promise.resolve();

		if(rule.action === 'speak'){
			//한 사람이 말함.
			chain2 = chain2.then(function(){
				data.speaker_index = rule.user_index;
				data.speaker_type = rule.user_type;

				data.mCommunictor.broadCast(true, 'action', rule);
				data.mCommunictor.broadCast(false, 'action', rule);

			}). then(function(){
				//특정 시간 동안 기다림
				console.log(rule.time * 10);
				setTimeout(function(){ console.log(index); }, (rule.time * 10));
				while(true){ }
			});
		} /*else if (rule.action === 'wait') {
			//모두 기다 림.
			this.speaker_index = -1;
		}*/
	}
}

module.exports = RuleLauncther;