var express = require('express');
var router = express.Router();
var ChatRoomHolder = require("./Chat/ChatRoomHolder.js");
/* GET home page. */
router.get('/', function(req, res, next) {
 var roomList = ChatRoomHolder.getRoomList();
	//res.write(roomList);
	res.render('main', {roomlist: roomList});
});

module.exports = router;