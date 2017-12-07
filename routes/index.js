var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('makeroom');
 });

router.get('/2', function(req, res, next) {
  res.render('index2');
});

module.exports = router;
