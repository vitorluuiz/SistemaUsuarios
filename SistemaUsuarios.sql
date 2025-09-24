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

CREATE TABLE Produtos (
id_produto INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL UNIQUE,
preco DECIMAL(8,2) NOT NULL,
categoria VARCHAR(30) NOT NULL
);

INSERT INTO Produtos (nome, preco, categoria)
VALUES ("RTX 5070", 3799, "Placa de vídeo");


SELECT * FROM Usuarios;
SELECT * FROM Produtos;


