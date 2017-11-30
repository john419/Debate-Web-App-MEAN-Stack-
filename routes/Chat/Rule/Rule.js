class Rule{
	constructor() {
		this.mName; //규칙의 이름
		this.mRule = []; //규칙의 정의
		this.mMaxAgreeUserNum = 5; //동의 사람 수
		this.mMaxDisAgreeUserNum = 5; //반대 사람 수
	}
	getMaxAgreeUserNum(){ return this.mMaxAgreeUserNum; }
	getMaxDisAgreeUserNum(){ return this.mMaxDisAgreeUserNum; }
}

module.exports = Rule;