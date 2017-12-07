var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var main = require('./routes/main');
var form_receiver = require('./routes/form_receiver');
var joinRoom = require('./routes/join_room.js');

//var form_receiver = require('./routes/form_receiver');
var ChatRoomHolder = require("./routes/Chat/ChatRoomHolder.js");
//var ChatRoomHolderCreate = ChatRoomHolder();

var app = express();

app.io = require('socket.io')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/main', main);
app.use('/form_receiver', form_receiver);
app.use('/jr', joinRoom);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




var count=1;

/*


*/
app.io.on('connection', function(socket){
	/*
		방 참가
		파라미터
			room_id(string) : 방 고유 id
			TF : 유저가 찬성 측 인지, 반대 측 인지
		결과
			없음. 실패의 경우 ChatRoom객체가 실패 메시지를 모냄.
	*/
	socket.on('join_room', function(room_id, TF){
		ChatRoomHolder.joinRoom(room_id,socket,TF);
	});

	//유저가 접속 종료
	socket.on('disconnect', function(){
		console.log('user disconnected: ', socket.id);
	});

	//유저가 메시지 보냄
	socket.on('send_message', function(room_id, user, type, msg){
		ChatRoomHolder.getMsg(room_id,user,type,msg);
	});

	socket.on('vote', function(room_id,user,TF){
		ChatRoomHolder.vote(room_id,user,TF);
	});
});

module.exports = app;
