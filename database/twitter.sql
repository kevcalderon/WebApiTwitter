CREATE DATABASE Twitter;
USE Twitter;

CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    apellido VARCHAR(40) NOT NULL,
    nick VARCHAR(40) NOT NULL,
    contrasena VARCHAR(40) NOT NULL,
    PRIMARY KEY (idUsuario)
);

DELIMITER $$
CREATE PROCEDURE sp_insertUsuario(
	IN _nombre VARCHAR(40),
    IN _apellido VARCHAR(40),
    IN _nick VARCHAR(40),
    IN _contrasena VARCHAR(40))
BEGIN
	DECLARE _id INT;
    
    INSERT INTO Usuario (nombre, apellido, nick, contrasena) 
		VALUES (_nombre, _apellido, _nick, _contrasena);
	
    SET _id = (SELECT MAX(idUsuario) FROM Usuario);
    
    INSERT INTO Seguir (idUsuario, idUsuarioS) VALUES (_id, _id);
END $$

DELIMITER $$ 
CREATE PROCEDURE sp_updateUsuario(
	IN _nombre VARCHAR(40),
    IN _apellido VARCHAR(40),
    IN _contrasena VARCHAR(40),
    IN _idUsuario INT)
BEGIN
	UPDATE Usuario SET nombre=_nombre, apellido=_apellido, contrasena=_contrasena
		WHERE idUsuario=_idUsuario;
END $$

DELIMITER $$
CREATE PROCEDURE sp_selectUsuario(
	IN _idUsuario INT)
BEGIN
	SELECT * FROM Usuario WHERE idUsuario=_idUsuario;
END $$

DELIMITER $$
CREATE PROCEDURE sp_selectAllUsuario(
	IN _idUsuario INT)
BEGIN
    SELECT * FROM Usuario u WHERE
		NOT EXISTS (SELECT * FROM Seguir s WHERE s.idUsuario = _idUsuario 
        AND s.idUsuarioS = u.idUsuario);
END $$

DELIMITER $$
CREATE PROCEDURE sp_deleteUsuario(
	IN _idUsuario INT)
BEGIN
	DELETE FROM Seguir WHERE idUsuario=_idUsuario;
    
    DELETE FROM DetallePublicacion WHERE idUsuario=_idUsuario;
    
	DELETE FROM Usuario WHERE idUsuario=_idUsuario;
END $$

DELIMITER $$
CREATE PROCEDURE sp_login(
	IN _nick VARCHAR(40),
    IN _contrasena VARCHAR(40))
BEGIN
	SELECT * FROM Usuario WHERE nick=_nick AND contrasena=_contrasena;
END $$

CREATE TABLE Publicacion(
	idPublicacion INT NOT NULL AUTO_INCREMENT,
    descripcion TEXT NOT NULL,
    fecha DATETIME NOT NULL,
    PRIMARY KEY (idPublicacion)
);

CREATE TABLE DetallePublicacion(
	idDetalle INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idPublicacion INT NOT NULL,
    PRIMARY KEY (idDetalle),
    FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario),
    FOREIGN KEY (idPublicacion) REFERENCES Publicacion (idPublicacion)
);

DELIMITER $$
CREATE PROCEDURE sp_selectPublicacion(
	IN _idUsuario INT)
BEGIN
	SELECT DetallePublicacion.idDetalle, Publicacion.*  FROM DetallePublicacion
		INNER JOIN Publicacion ON DetallePublicacion.idPublicacion = Publicacion.idPublicacion
        WHERE DetallePublicacion.idUsuario=_idUsuario;
END $$

DELIMITER $$
CREATE PROCEDURE sp_insertPublicacion(
	IN _descripcion TEXT,
    IN _idUsuario INT)
BEGIN
	DECLARE _id INT;
    
	INSERT INTO Publicacion (descripcion, fecha) VALUES (_descripcion, NOW());
    
    SET _id = (SELECT MAX(idPublicacion) FROM Publicacion);
    
    INSERT INTO DetallePublicacion(idPublicacion, idUsuario) VALUES (_id, _idUsuario); 
END $$

DELIMITER $$
CREATE PROCEDURE sp_deletePublicacion(
	IN _idPublicacion INT)
BEGIN
	DELETE FROM DetallePublicacion WHERE idPublicacion=_idPublicacion;
    
    DELETE FROM Publicacion WHERE idPublicacion=_idPublicacion;
END $$

DELIMITER $$
CREATE PROCEDURE sp_selectAllPublicacion(
	IN _idUsuario INT)
BEGIN
	SELECT Publicacion.idPublicacion, Publicacion.descripcion, Publicacion.fecha, Usuario.nick FROM Seguir
		INNER JOIN DetallePublicacion ON Seguir.idUsuarioS = DetallePublicacion.idUsuario
        INNER JOIN Usuario ON DetallePublicacion.idUsuario = Usuario.idUsuario
        INNER JOIN Publicacion ON DetallePublicacion.idPublicacion = Publicacion.idPublicacion
		WHERE Seguir.idUsuario=_idUsuario;
END $$

CREATE TABLE Seguir(
	idSeguir INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idUsuarioS INT NOT NULL,
    PRIMARY KEY (idSeguir),
    FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario),
    FOREIGN KEY (idUsuarioS) REFERENCES Usuario (idUsuario)
);

DELIMITER $$
CREATE PROCEDURE sp_insertSeguir(
	IN _idUsuario INT,
    IN _idUsuarioS INT)
BEGIN
	INSERT INTO Seguir (idUsuario, idUsuarioS) VALUES (_idUsuario, _idUsuarioS);
    INSERT INTO Seguir (idUsuario, idUsuarioS) VALUES (_idUsuarioS, _idUsuario);
END $$

DELIMITER $$
CREATE PROCEDURE sp_deleteSeguir(
	IN _idUsuarioS INT,
    IN _idUsuario INT)
BEGIN
	DELETE FROM Seguir WHERE idUsuarioS=_idUsuarioS AND idUsuario=_idUsuario;
    DELETE FROM Seguir WHERE idUsuario=_idUsuarioS AND idUsuarioS=_idUsuario;
END $$

DELIMITER $$
CREATE PROCEDURE sp_selectAllSeguir(
	IN _idUsuario INT)
BEGIN
	SELECT Seguir.idSeguir, Usuario.* FROM Seguir 
		INNER JOIN Usuario ON Seguir.idUsuarioS = Usuario.idUsuario
        WHERE Seguir.idUsuario = _idUsuario GROUP BY Seguir.idUsuarioS; 
END $$