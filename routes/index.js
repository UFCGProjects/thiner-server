var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  res.redirect('http://thiner-les.github.io/pomt-android-app/');
});

module.exports = router;
