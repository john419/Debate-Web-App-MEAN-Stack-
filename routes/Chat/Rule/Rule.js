class Rule{
	constructor() {
		this.mName; //규칙의 이름
		this.mRule = [
		{
			action : 'speak',
			name : '찬성측 입론',
			user_index : 1,
			user_type : true,
			time : 420
		},
		{
			action : 'speak',
			name : '찬성측 입론',
			user_index : 1,
			user_type : true,
			time : 420
		}
		];
		this.mMaxAgreeUserNum = 1; //동의 사람 수
		this.mMaxDisAgreeUserNum = 1; //반대 사람 수
	}
	getRuleSize() { return this.mRule.length; }
	getRuleInfo(index) { return this.mRule[index]; }
	getMaxUserNum(TF){ return (TF)? this.mMaxAgreeUserNum : this.mMaxDisAgreeUserNum; }
}

module.exports = Rule;