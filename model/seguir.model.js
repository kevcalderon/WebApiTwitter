var database = require('../config/database.config');
var Seguir = {};

Seguir.insert = function(data, callback){
	if(database){
		database.query('CALL sp_insertSeguir(?,?)', [data.idUsuario, data.idUsuarioS],
			function(error, resultado){
				if(error) throw error;
				callback(true);
			});
	}
}

Seguir.delete = function(data, callback){
	if(database){
		database.query('CALL sp_deleteSeguir(?,?)', [data.idUsuarioS, data.idUsuario], 
			function(error, resultado){
			if(error) throw error;
			callback(true);
		});
	}
}

Seguir.selectAll = function(data, callback){
	if(database){
		database.query('CALL sp_selectAllSeguir(?)', [data.idUsuario], function(error, resultado){
			if(error) throw error;
			callback(resultado[0]);
		});
	}
}

module.exports = Seguir;