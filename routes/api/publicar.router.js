var express = require('express');
var router = express.Router();
var Publicar = require('../../model/publicacion.model');
var service = require('../../service/service');

router.post('/publicar/', service.verificar, function(req, res){
	var data = {
		descripcion : req.body.descripcion,
		idUsuario : req.usuario.idUsuario
	}

	Publicar.insert(data, function(resultado){
		if(resultado){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

router.delete('/publicar/:idPublicacion', service.verificar, function(req, res){
	var data = {
		idPublicacion : req.params.idPublicacion
	}

	Publicar.delete(data, function(resultado){
		if(resultado){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

router.get('/publicar/', service.verificar, function(req, res){
	var data = {
		idUsuario : req.usuario.idUsuario
	}

	Publicar.selectAll(data, function(resultado){
		if(typeof resultado !== 'undefined'){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

router.get('/publicar/all/', service.verificar, function(req, res){
	var data = {
		idUsuario : req.usuario.idUsuario
	}

	Publicar.select(data, function(resultado){
		if(typeof resultado !== 'undefined'){
			res.json(resultado);
		}else{
			res.json(false);
		}
	});
});

module.exports = router;