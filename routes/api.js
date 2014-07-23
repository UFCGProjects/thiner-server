// var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* POST user infos. */
router.post('/user/create', function(req, res) {
  var user = new User();

  user.username = req.body.username;
  user.password = req.body.password;

  // Saving it to the database.
  user.save(function (err) {
    if (err) {
      var result = {'status': 'failed', 'err': err.stack}
    } else {
      var result = {'status': 'user created'};
    }

    res.end(JSON.stringify(result));
  });

});

/* GET user infos. */
router.get('/user/all', function(req, res) {

  User.find({}).exec(function(err, result) {
    if (!err) {
      res.send(result);
    }
  });

});

module.exports = router;
