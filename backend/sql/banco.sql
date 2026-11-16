-- ===========================================================================
-- ARA0062 — o banco do projeto
-- Ainda vazio: é preenchido na aula 09, práticas 1 a 3.
--
-- O banco de dados NÃO vai para o GitHub: ele mora no MySQL de cada
-- computador. Este arquivo vai. Com ele, qualquer pessoa da equipe (e o
-- professor) cria o mesmo banco e a mesma tabela no próprio XAMPP:
-- phpMyAdmin → aba SQL (ou Importar) → este arquivo → Executar.
--
-- Em SQL, comentário de uma linha começa com dois traços e um espaço.
-- ===========================================================================

CREATE DATABASE IF NOT EXISTS Fulano
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE Fulano;

CREATE TABLE IF NOT EXISTS mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(120) NOT NULL,
    assunto VARCHAR(20) NOT NULL,
    mensagem TEXT NOT NULL,
    criada_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
); 