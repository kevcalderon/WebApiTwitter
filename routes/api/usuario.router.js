var express = require('express');
var router = express.Router();
var Usuario = require('../../model/usuario.model');
var service = require('../../service/service');

router.post('/usuario/', function(req, res){
	var data = {
		nombre : req.body.nombre,
		apellido : req.body.apellido,
		nick : req.body.nick,
		contrasena : req.body.contrasena
	}

	Usuario.insert(data, function(resultado){
		if(resultado){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

router.put('/usuario/', service.verificar, function(req, res){
	var data = {
		nombre : req.body.nombre,
		apellido : req.body.apellido,
		contrasena : req.body.contrasena,
		idUsuario : req.usuario.idUsuario
	}

	Usuario.update(data, function(resultado){
		if(resultado){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

router.get('/usuario/', service.verificar, function(req, res){
	var data = {
		idUsuario : req.usuario.idUsuario
	}

	Usuario.select(data, function(resultado){
		if(typeof resultado !== 'undefined'){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

router.get('/usuario/all/', service.verificar, function(req, res){
	var data = {
		idUsuario : req.usuario.idUsuario
	}

	Usuario.selectAll(data, function(resultado){
		if(typeof resultado !== 'undefined'){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

router.delete('/usuario/', service.verificar, function(req, res){
	var data = {
		idUsuario : req.usuario.idUsuario
	}

	Usuario.delete(data, function(resultado){
		if(resultado){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

module.exports = router;