CREATE DATABASE haze; 
USE haze;
-- 1. Tabela de visitantes anônimos
CREATE TABLE visitante (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token_sessao CHAR(36) NOT NULL UNIQUE,
  primeira_visita DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de áreas (salas/seções)
CREATE TABLE area (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(50) NOT NULL UNIQUE,
  nome VARCHAR(100) NOT NULL,
  tipo ENUM('jogo','site') NOT NULL DEFAULT 'jogo'
);

-- 3. Tabela de visitas
CREATE TABLE visita (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_visitante INT NOT NULL,
  id_area INT NOT NULL,
  momento_visita DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_visitante) REFERENCES visitante(id) ON DELETE CASCADE,
  FOREIGN KEY (id_area) REFERENCES area(id) ON DELETE CASCADE,
  INDEX (id_area),
  INDEX (id_visitante)
);

-- 4. Tabela de avaliações (feedback)
CREATE TABLE avaliacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_visitante INT ,
  id_area INT NULL,  
  nota TINYINT NOT NULL CHECK (nota BETWEEN 1 AND 5),
  comentario TEXT NULL,
  enviado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_visitante) REFERENCES visitante(id) ON DELETE SET NULL,
  FOREIGN KEY (id_area) REFERENCES area(id) ON DELETE SET NULL,
  INDEX (enviado_em)
);

