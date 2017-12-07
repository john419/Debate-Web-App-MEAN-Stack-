
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

		launch(0, this.mRule, this.mCommunictor);
	}
}


launch = function(index, mRule, mCommunictor){

	console.log(index);

	if(mRule.getRuleSize() <= index)
		return;

	console.log(mRule.getRuleSize());

	var rule = mRule.getRuleInfo(index);

	if(rule.action === 'speak'){
		//한 사람이 말함.
		
		mCommunictor.broadCast(true, 'action', rule);
		mCommunictor.broadCast(false, 'action', rule);

		setTimeout(launch, (rule.time * 10), index + 1, mRule, mCommunictor);
	} 
}

module.exports = RuleLauncther;