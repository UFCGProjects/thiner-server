var express = require('express');
var router = express.Router();

var users = require('./users');

router.get('/users', users.list);
router.post('/users', users.create);
router.get('/users/:id', users.show);
router.post('/users/:id', users.edit);
router.delete('/users/:id', users.del);

router.post('/users/:id/follow', users.follow);
router.post('/users/:id/unfollow', users.unfollow);

module.exports = router;
