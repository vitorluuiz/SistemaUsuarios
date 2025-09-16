CREATE DATABASE SistemaUsuarios;
USE SistemaUsuarios;

CREATE TABLE Usuarios (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
email VARCHAR(320) NOT NULL UNIQUE,
senha CHAR(60) NOT NULL
); 

INSERT INTO Usuarios (nome, email, senha)
VALUES ("Vitor Luiz", "vitor@gmail.com", "$2a$10$rWVD9LJzVXcdgzemUVbNJ.HEchZdEbJMXvSviw.2tQ6DghLGJmls.");

SELECT * FROM Usuarios;


