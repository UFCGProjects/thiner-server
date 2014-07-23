// var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Ti = require('../models/ti');

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

/* GET ti infos. */
router.get('/ti', function(req, res) {
  var week = new Date().getWeek();
  var rules = {'username': 'developer', week: {$gte: week - 2, $lte: week}};

  var result = {};

  for (var i = week - 2; i <= week; i++) {
    result[i] = { total : 0 , tis : {} };
  }

  Ti.find(rules).exec(function(err, tis) {
    if (!err) {

      tis.forEach(function (ti) {
        if (result[ti.week].tis[ti.title]) {
          result[ti.week].tis[ti.title].hours += ti.hours;
        } else {
          result[ti.week].tis[ti.title] = { hours : ti.hours, proporcion : -1, priority : ti.priority };
        }

        result[ti.week].total += ti.hours;
      });

      for (var i = week - 2; i <= week; i++) {
        for (var ti in result[i].tis) {
          result[i].tis[ti].proporcion = result[i].tis[ti].hours / result[i].total;
        }
      }

      result['all'] = tis;
      res.send(result);
    }
  });

});

/* GET ti infos. */
router.get('/ti/:username', function(req, res) {
  var week = new Date().getWeek();
  var rules = {'username': req.params.username, week: {$gte: week - 2, $lte: week}};

  var result = {};

  for (var i = week - 2; i <= week; i++) {
    result[i] = { total : 0 , tis : {} };
  }

  Ti.find(rules).exec(function(err, tis) {
    if (!err) {

      tis.forEach(function (ti) {
        if (result[ti.week].tis[ti.title]) {
          result[ti.week].tis[ti.title].hours += ti.hours;
        } else {
          result[ti.week].tis[ti.title] = { hours : ti.hours, proporcion : -1, priority : ti.priority };
        }

        result[ti.week].total += ti.hours;
      });

      for (var i = week - 2; i <= week; i++) {
        for (var ti in result[i].tis) {
          result[i].tis[ti].proporcion = result[i].tis[ti].hours / result[i].total;
        }
      }

      result['all'] = tis;
      res.send(result);
    }
  });

});

/* GET ti infos. */
router.get('/ti/all', function(req, res) {
  var rules = {'username': 'developer'};

  Ti.find(rules).exec(function(err, result) {
    if (!err) {
      res.send(result);
    }
  });

});

/* POST ti infos. */
router.post('/ti', function(req, res) {
  var ti = new Ti();

  ti.title = req.body.title;
  ti.description = req.body.description;
  ti.category = req.body.category;
  ti.date_begin = req.body.date_begin;
  ti.date_end = req.body.date_end;
  ti.week = ti.date_begin.getWeek();
  ti.hours = Math.abs(ti.date_begin - ti.date_end) / 36e5;
  ti.username = req.body.username;
  ti.priority = req.body.priority;

  // Saving it to the database.
  ti.save(function (err) {
    if (err) {
      var result = {'status': 'failed', 'err': err.stack}
    } else {
      var result = {'status': 'success'};
    }

    res.end(JSON.stringify(result));
  });

});

module.exports = router;
