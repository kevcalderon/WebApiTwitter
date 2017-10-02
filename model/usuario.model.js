var database = require('../config/database.config');
var Usuario = {};

Usuario.insert = function(data, callback){
	if(database){
		database.query('CALL sp_insertUsuario(?,?,?,?)', [data.nombre, data.apellido,
			data.nick, data.contrasena], function(error, resultado){
				if(error) throw error;
				callback(true);
			});
	}
}

Usuario.update = function(data, callback){
	if(database){
		database.query('CALL sp_updateUsuario(?,?,?,?)', [data.nombre, data.apellido,
			data.contrasena, data.idUsuario], function(error, resultado){
				if(error) throw error;
				callback(true);
			});
	}
}

Usuario.select = function(data, callback){
	if(database){
		database.query('CALL sp_selectUsuario(?)', [data.idUsuario], function(error, resultado){
			if(error) throw error;
			callback(resultado[0]);
		});
	}
}

Usuario.selectAll = function(data, callback){
	if(database){
		database.query('CALL sp_selectAllUsuario(?)', [data.idUsuario], function(error, resultado){
			if(error) throw error;
			callback(resultado[0]);
		});
	}
}

Usuario.delete = function(data, callback){
	if(database){
		database.query('CALL sp_deleteUsuario(?)', [data.idUsuario], function(error, resultado){
			if(error) throw error;
			callback(true);
		})
	}
}

Usuario.login = function(data, callback){
	if(database){
		database.query('CALL sp_login(?,?)', [data.nick, data.contrasena], function(error, resultado){
			if(error) throw error;
			callback(resultado[0]);
		});
	}
}

module.exports = Usuario;