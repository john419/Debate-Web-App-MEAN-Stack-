var express = require('express');
var router = express.Router();
var ChatRoomHolder = require("./Chat/ChatRoomHolder.js");
//var ChatRoomHolder = require("./routes/Chat/ChatRoomHolder.js");
/* GET home page. */

router.post('/',  function(req, res, next) {
	console.log("12344__");
	console.log(req.body);

    res.render('debateroom', {room_id : req.body.room_id, type : req.body.type});
//    res.render('debateroom', {room_id : 1});
});
module.exports = router;
