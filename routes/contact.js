// var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Contato = require('../models/contato');


/*
 Adicionar um contato ao usuário.

 Parâmetros:
 - Id : id do usuario
 - DDD : DDD do telefone
 - numero : numero do telefone
 - operadora : operadora do telefone
 */
router.post('/contact', function (req, res) {

    var id = req.param('id');
    var ddd = req.param('ddd');
    var number = req.param('number');
    var operadora = req.param('operadora');

    if (!operadora || !id || !number || !ddd) {
        res.json(400, {'status': 'failed', 'err': 'missing paramters'});
    } else {

//    var rules = { 'username': req.body.username.toLowerCase() };

        User.findById(id).exec(function (err, user) {
            if (!err) {

                var contato = new Contato();

                contato.DDD = ddd
                contato.numero = number
                contato.operadora = operadora.toLowerCase();

                contato.save(function (err) {
                    if (err) {
                        res.json(400, {'status': 'failed', 'err': err.stack});
                    } else {
                        user.contatos.push(contato._id);

                        user.save(function (err) {
                            if (err) {
                                res.json(400, {'status': 'failed', 'err': err.stack});
                            } else {
                                res.json(200, {'status': 'success'});
                            }
                        });
                    }
                });
            }
        });
    }
});


/*
 Editar um contato.

 Parâmetros:
 - contato_id
 - DDD
 - Numero do Telefone
 - Operadora
 */
router.post('/contact/edit', function (req, res) {
    var update = {};

    if (req.body.DDD)
        update['DDD'] = req.body.DDD;

    if (req.body.numero)
        update['numero'] = req.body.numero.toLowerCase();

    if (req.body.operador)
        update['operador'] = req.body.operador.toLowerCase();


    Contato.findByIdAndUpdate(req.body.id, update, function (err, data) {
        if (err) {
            res.json(400, {'status': 'failed', 'err': err.stack});
        } else if (data) {
            res.json(200, {'status': 'contact edited'});
        } else {
            res.json(400, {'status': 'failed', 'err': 'contact not found'});
        }
    });
});


module.exports = router;