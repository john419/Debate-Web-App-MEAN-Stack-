var express = require('express');
var router = express.Router();
var ChatRoomHolder = require("./Chat/ChatRoomHolder.js");
//var ChatRoomHolder = require("./routes/Chat/ChatRoomHolder.js");
/* GET home page. */

console.log("???");

router.post('/',  function(req, res, next) {

    console.log("!!!");
	//var selectbox = document.getElementById("rule");
   // var ruleIndex = selectbox.options[selectbox.selectedIndex].value;
    var title = req.body.title;
    var subject = req.body.subject;
    var ruleIndex = req.body.rule;

    
    var room_id = ChatRoomHolder.createRoom2(subject, ruleIndex);
    console.log(ruleIndex);
    res.render('debateroom', {room_id : room_id, type : req.body.TF});
});

module.exports = router;
