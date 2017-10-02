var database = require('../config/database.config');
var Publicacion = {};

Publicacion.insert = function(data, callback){
	if(database){
		database.query('CALL sp_insertPublicacion(?,?)', [data.descripcion, data.idUsuario],
			function(error, resultado){
				if(error) throw error;
				callback(true);
			});
	}
}

Publicacion.delete = function(data, callback){
	if(database){
		database.query('CALL sp_deletePublicacion(?)', [data.idPublicacion],
			function(error, resultado){
				if(error) throw error;
				callback(true);
			});
	}
}

Publicacion.selectAll = function(data, callback){
	if(database){
		database.query('CALL sp_selectAllPublicacion(?)', [data.idUsuario], 
			function(error, resultado){
				if(error) throw error;
				callback(resultado[0]);
			});
	}
}

Publicacion.select = function(data, callback){
	if(database){
		database.query('CALL sp_selectPublicacion(?)', [data.idUsuario],
			function(error, resultado){
				if(error) throw error;
				callback(resultado[0]);
			})
	}
}

module.exports = Publicacion;