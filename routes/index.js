var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login',function(req, res, next){
  fs.createReadStream(path.join(__dirname,'../public/login.html')).pipe(res);
});

module.exports = router;
