<?php 
$servidor = "localhost";
$banco = "Fulano";
$usuario = "root";
$senha = "";

$conexao = new PDO("mysql:host=$servidor;dbname=$banco;charset=utf8mb4", $usuario, $senha);