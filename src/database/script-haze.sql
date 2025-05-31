CREATE DATABASE haze; 
USE haze;



CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL Unique,
    bio     VARCHAR(300),
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    steamId		VARCHAR(100) NULL
);

use haze;


CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    conteudo TEXT NOT NULL,
    data_postagem DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);



CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    usuario_id INT NOT NULL,
    conteudo TEXT NOT NULL,
    data_comentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE imagens_mural (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    url_imagem TEXT NOT NULL,
    descricao TEXT,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE avaliacoes_imagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    imagem_id INT NOT NULL,
    nota TINYINT NOT NULL CHECK (nota BETWEEN 1 AND 5),
    data_avaliacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, imagem_id), -- garante que o usuário avalie cada imagem só uma vez
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (imagem_id) REFERENCES imagens_mural(id)
);


CREATE TABLE pontuacoes_jogo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    pontuacao INT NOT NULL,
    tempo_segundos FLOAT, -- quanto tempo levou para fazer a pontuação
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

use haze;
select * from usuarios;