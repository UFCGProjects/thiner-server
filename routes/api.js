// var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* POST user infos. */
router.post('/user', function(req, res) {
  var user = new User();

  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;

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

/* Edit user infos. */
router.post('/edit', function(req, res) {
  var rules = { 'username': req.body.username };

  User.find(rules).exec(function (err, result) {
    if (!err) {

      result[0].username = req.body.username;
      result[0].password = req.body.password;
      result[0].email = req.body.email;

      result[0].save(function (err) {
        if (err) {
          res.end(JSON.stringify({'status': 'failed', 'err': err.stack}));
        } else {
          res.end(JSON.stringify({'status': 'user edited'}));
        }
      });
    }
  });

});


router.post('/contact', function (req, res) {
  var rules = { 'username': req.body.username };

  User.find(rules).exec(function (err, result) {
    if (!err) {

      var user = new User();

      user._id = result[0]._id;
      user.username = result[0].username;
      user.password = result[0].password;
      user.email = result[0].email;

      user.save(function (err) {
        if (err) {
          var result = {'status': 'failed', 'err': err.stack}
        } else {
          var result = {'status': 'contact added'};
        }

        res.end(JSON.stringify(result));
      });
    }
  });

});

/* Search for users */
router.get('/search', function(req, res) {
  var rules = { 'username': new RegExp('^' + req.query.username + '$', "i") };

  User.find(rules).exec(function(err, result) {
    if (!err) {
      res.send(result);
    }
  });

});

/* Check for login */
router.get('/login', function(req, res) {
  var rules = {'username': req.query.username, 'password': req.query.password};

  User.find(rules).exec(function(err, result) {
    if (!err) {
      res.send(result);
    }
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
