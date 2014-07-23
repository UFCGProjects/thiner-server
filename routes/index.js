var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.redirect('http://thiner-les.github.io/thiner/');
  res.send('Hello Thiner!');

});

module.exports = router;
