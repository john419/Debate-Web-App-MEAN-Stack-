class Rule{


   // constructor() {
   //    this.mName; //규칙의 이름
   //    this.mMaxAgreeUserNum = 5; //동의 사람 수
   //    this.mMaxDisAgreeUserNum = 5; //반대 사람 수
 //        this.mRule = [] //규칙의 정의
   // }

   constructor(index){
      this.mName=""; //규칙의 이름
      this.mMaxAgreeUserNum = 0; //동의 사람 수
      this.mMaxDisAgreeUserNum = 0; //반대 사람 수
      this.mRule = [] //규칙의 정의
      this.getRule(index);
      //return this;
   }

   getRule(index){
   	
	switch(index){

	 case '0' : this.mName="빠르게 2:2";
	        this.mMaxAgreeUserNum = 2;
	        this.mMaxDisAgreeUserNum = 2;
	        this.mRule=this.setRule(240, 180, 60, 2, 2);
	        break;

	 case '1' : this.mName="천천히 2:2";
	        this.mMaxAgreeUserNum = 2;
	        this.mMaxDisAgreeUserNum = 2;
	        this.mRule=this.setRule(420, 300, 120, 2, 2);

	 case '2' : this.mName="빠르게 4:4";
	        this.mMaxAgreeUserNum = 4;
	        this.mMaxDisAgreeUserNum = 4;
	        this.mRule=this.setRule(240, 180, 60, 4, 4);

	 case '3' : this.mName="천천히 4:4";
	        this.mMaxAgreeUserNum = 4;
	        this.mMaxDisAgreeUserNum = 4;
	        this.mRule=this.setRule(420, 300, 180, 4, 4);
	}

   }

setRule(argTime, objectTime, breakTime, agreeNum, disagreeNum){
      var agreeUser = 0;
      var disagreeUser = 0;

      var speakInfo1 = new Object();
          speakInfo1.action = "speak"; 
          speakInfo1.name = "입론";
          speakInfo1.user = agreeUser;
          speakInfo1.type = true;
          speakInfo1.time = argTime;

        var waitInfo1 = new Object();
           waitInfo1.action = "wait"
           waitInfo1.name = "1차"
           waitInfo1.time = breakTime;

        var ruleArr = new Array();

        ruleArr.push(speakInfo1); //찬성측 입론 시작

        var speakInfo2 = new Object(); //반대측 반론
          speakInfo2.action = "speak"; 
          speakInfo2.name = "반론";
          speakInfo2.user = disagreeUser;
          speakInfo2.type = false;
          speakInfo2.time = objectTime;

         ruleArr.push(speakInfo2);

        // speakInfo.type=false; //반대측 반론
        // speakInfo.name="반론";
        // speakInfo.time=objectTime;
        // ruleArr.push(speakInfo);

        var speakInfo3 = new Object(); //반대측 입론
          speakInfo3.action = "speak"; 
          speakInfo3.name = "입론";
          speakInfo3.user = ++disagreeUser;
          speakInfo3.type = false;
          speakInfo3.time = argTime;

          ruleArr.push(speakInfo3);

        // speakInfo.name="입론"; //반대측 입론
        // speakInfo.time=argTime;
        // speakInfo.user= ++disagreeUser;
        // ruleArr.push(speakInfo);

        var speakInfo4 = new Object(); //찬성측 반론
          speakInfo4.action = "speak"; 
          speakInfo4.name = "반론";
          speakInfo4.user = ++agreeUser;
          speakInfo4.type = true;
          speakInfo4.time = objectTime;

          ruleArr.push(speakInfo4);

        // speakInfo.type=true; //찬성측 반론
        // speakInfo.name="반론";
        // speakInfo.time=objectTime;
        // speakInfo.user= ++agreeUser;
        // ruleArr.push(speakInfo);

        ruleArr.push(waitInfo1); //1차 쉬는시간

        if(agreeNum<3){
           agreeUser=-1;
           disagreeUser=-1;
        }

         var speakInfo5 = new Object(); //찬성측 논박
          speakInfo5.action = "speak"; 
          speakInfo5.name = "논박";
          speakInfo5.user = ++agreeUser;
          speakInfo5.type = true;
          speakInfo5.time = objectTime;

          ruleArr.push(speakInfo5);

        // speakInfo.name="논박"; //찬성측 논박
        // speakInfo.user= ++agreeUser;
        // ruleArr.push(speakInfo);


        var speakInfo6 = new Object(); //반대측 논박
          speakInfo6.action = "speak"; 
          speakInfo6.name = "논박";
          speakInfo6.user = ++disagreeUser;
          speakInfo6.type = false;
          speakInfo6.time = objectTime;

          ruleArr.push(speakInfo6);


        // speakInfo.type=false; //반대측 논박
        // speakInfo.user= ++disagreeUser;
        // ruleArr.push(speakInfo);

        var waitInfo2 = new Object();
           waitInfo2.action = "wait"
           waitInfo2.name = "2차"
           waitInfo2.time = breakTime;

        ruleArr.push(waitInfo2);

      var speakInfo7 = new Object(); //찬성측 최종
          speakInfo7.action = "speak"; 
          speakInfo7.name = "최종";
          speakInfo7.user = ++agreeUser;
          speakInfo7.type = true;
          speakInfo7.time = objectTime;

          ruleArr.push(speakInfo7);

          var speakInfo8 = new Object(); //반대측 최종
          speakInfo8.action = "speak"; 
          speakInfo8.name = "최종";
          speakInfo8.user = ++disagreeUser;
          speakInfo8.type = false;
          speakInfo8.time = objectTime;

          ruleArr.push(speakInfo8);

      var vote = new Object();
          vote.action = "vote";
          vote.name = "결론";

          ruleArr.push(vote);

        // speakInfo.type=true;
        // speakInfo.name="최종";
        // speakInfo.user= ++agreeUser;
        // ruleArr.push(speakInfo);

        // speakInfo.type=false;
        // speakInfo.user= ++disagreeUser;
        // ruleArr.push(speakInfo);

        return ruleArr;
           

   }

   getMaxAgreeUserNum(){ return this.mMaxAgreeUserNum; }
   getMaxDisAgreeUserNum(){ return this.mMaxDisAgreeUserNum; }
   getRuleSize() { return this.mRule.length; }
   getRuleInfo(index) { return this.mRule[index]; }
   getMaxUserNum(TF){ return (TF)? this.mMaxAgreeUserNum : this.mMaxDisAgreeUserNum; }
}

module.exports = Rule;