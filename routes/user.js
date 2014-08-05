var _  = require('lodash');
var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Contato = require('../models/contato');

var contactRouter = require('./contact');


/*
 Contact Routers!
 */
router.use('/', contactRouter);


/*
 Criar um usuário.

 Parâmetros:
 - username
 - password
 - email
 */
router.post('/', function (req, res) {
    var user = new User();

    user.username = req.body.username.toLowerCase();
    user.password = req.body.password;
    user.email = req.body.email.toLowerCase();
    user.firstname = req.body.firstname.toLowerCase();
    user.lastname = req.body.lastname.toLowerCase();


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


/*
 Editar um usuário.

 Parâmetros:
 - username
 - password
 - email
 - firstname
 - lastname
 */
router.post('/edit', function (req, res) {
    var query = { 'username': req.body.username.toLowerCase() };

    var update = {};

    if (req.body.password)
        update['password'] = req.body.password;

    if (req.body.email)
        update['email'] = req.body.email.toLowerCase();

    if (req.body.firstname)
        update['firstname'] = req.body.firstname.toLowerCase();

    if (req.body.lastname)
        update['lastname'] = req.body.lastname.toLowerCase();


    User.findOneAndUpdate(query, update, function (err, data) {
        if (err) {
            res.end(JSON.stringify({'status': 'failed', 'err': err.stack}));
        } else if (data) {
            res.end(JSON.stringify({'status': 'user edited'}));
        } else {
            res.end(JSON.stringify({'status': 'failed', 'err': 'user not found'}));
        }
    });

});


/*
 Pesquisar usuários pelo username (CaseInsensitive)

 Parâmetros:
 - username
 */
router.get('/search', function (req, res) {
    var rules = { 'username': new RegExp('^' + req.query.username + '$', "i") };

    User.find(rules).exec(function (err, result) {
        if (!err) {
            res.send(result);
        }
    });

});


/*
 Request a friend.

 Parâmetros:
 - username
 - friend
 */
router.post('/request', function (req, res) {

    User.findById(req.body.id).exec(function (err, user) {
        if (err) {
            res.end(JSON.stringify({'status': 'failed', 'err': err.stack}));
        } else {
            user.requests.push(req.body.friend);

            user.save(function (err) {
                if (err) {
                    res.end(JSON.stringify({'status': 'failed', 'err': err.stack}));
                } else {
                    res.end(JSON.stringify({'status': 'success'}));
                }
            });
        }
    });
});

/*
 Accept a friend request.

 Parâmetros:
 - user id
 - friend id
 */
router.post('/request/accept', function (req, res) {

    User.findById(req.body.id).exec(function (err, user) {
        if (err) {
            res.end(JSON.stringify({'status': 'failed', 'err': err.stack}));
        } else {

            var oldLength = user.requests.length;

            var evens = _.remove(user.requests, function (u) {
                return u._id == req.body.friend;
            });

            if (oldLength != evens.length) {

                user.requests = evens;

                var hasFriend = _.contains(user.friends, req.body.friend);

                if (user.friends.indexOf(req.body.friend) == -1)
                    user.friends.push(req.body.friend);

                user.save(function (err) {
                    if (err) {
                        res.end(JSON.stringify({'status': 'failed', 'err': err.stack}));
                    } else {
                        res.end(JSON.stringify({'status': 'success'}));
                    }

                });
            } else {
                res.end(JSON.stringify({'status': 'failed', 'err': 'you dont have this request'}));
            }

        }
    });
});


/*
 Reject a friend request.

 Parâmetros:
 - user id
 - friend id
 */
router.post('/request/remove', function (req, res) {

    User.findById(req.body.id).exec(function (err, user) {
        if (err) {
            res.end(JSON.stringify({'status': 'failed', 'err': err.stack}));
        } else {

            var oldLength = user.requests.length;

            var evens = _.remove(user.requests, function (u) {
                return u._id == req.body.friend;
            });


            if (oldLength != evens.length) {
                user.requests = evens;

                user.save(function (err) {
                    if (err) {
                        res.end(JSON.stringify({'status': 'failed', 'err': err.stack}));
                    } else {
                        res.end(JSON.stringify({'status': 'success', 'msg': 'request removed'}));
                    }

                });
            } else {
                res.end(JSON.stringify({'status': 'failed', 'err': 'you dont have this request'}));
            }

        }
    });
});



/*
 Remove a friend.

 Parâmetros:
 - user id
 - friend id
 */
router.post('/friend/remove', function (req, res)
{

    User.findById(req.body.id).exec(function (err, user) {
        if (err) {
            res.end(JSON.stringify({'status': 'failed', 'err': err.stack}));
        } else {

            var oldLength = user.friends.length;

            var evens = _.remove(user.friends, function (u) {
                return u._id == req.body.friend;
            });

            if (oldLength != evens.length) {
                user.friends = evens;

                user.save(function (err) {
                    if (err) {
                        res.end(JSON.stringify({'status': 'failed', 'err': err.stack}));
                    } else {
                        res.end(JSON.stringify({'status': 'success', 'msg': 'friend removed'}));
                    }

                });
            } else {
                res.end(JSON.stringify({'status': 'failed', 'err': 'you dont have this friend'}));
            }

        }
    });

});


/*
 Login no sistema.

 Parâmetros:
 - username
 - password
 */
router.get('/login', function (req, res) {
    var rules = {'username': req.query.username, 'password': req.query.password};

    User.find(rules).exec(function (err, result) {
        if (!err) {
            res.send(result);
        }
    });

});


/*
 Recuperar todas as informações dos usuários no servidor.
 */
router.get('/all', function (req, res) {

    User.find({}).populate('contatos').populate('requests').exec(function (err, result) {
        if (!err) {
            res.send(result);
        }
    });

});


module.exports = router;