var express = require('express');
var router = express.Router();
var fs  = require('fs');
var path = require('path');


router.get('/', function(req, res, next) {
  fs.createReadStream(path.join(__dirname,'../public/index.html')).pipe(res);
});



module.exports = router;
