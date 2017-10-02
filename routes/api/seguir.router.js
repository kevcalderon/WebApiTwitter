var express = require('express');
var router = express.Router();
var Seguir = require('../../model/seguir.model');
var service = require('../../service/service');

router.post('/seguir/:idUsuarioS', service.verificar, function(req, res){
	var data = {
		idUsuario : req.usuario.idUsuario,
		idUsuarioS : req.params.idUsuarioS
	}

	Seguir.insert(data, function(resultado){
		if(resultado){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

router.delete('/seguir/:idUsuarioS', service.verificar, function(req, res){
	var data = {
		idUsuarioS : req.params.idUsuarioS,
		idUsuario : req.usuario.idUsuario
	}

	Seguir.delete(data, function(resultado){
		if(resultado){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

router.get('/seguir/', service.verificar, function(req, res){
	var data = {
		idUsuario : req.usuario.idUsuario
	}

	Seguir.selectAll(data, function(resultado){
		if(typeof resultado !== 'undefined'){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

module.exports = router;