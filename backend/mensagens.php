<?php
require "config/conexao.php";
$comando = $conexao->query("SELECT * FROM mensagens ORDER BY id DESC");
$mensagens = $comando->fetchAll();
$total = count($mensagens);
?>
 <!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mensagens recebidas — Ana Clara</title>
<link rel="stylesheet" href="../frontend/css/estilo.css">
</head>
<body>
<header>
<h1>Ana Clara</h1>
<p>Estudante de Sistemas de Informação</p>
</header>
<main>
<section id="mensagens">
<h2>Mensagens recebidas</h2>
<p class="aviso"><?php echo $total; ?> mensagem(ns) no banco.</p>
<table>
<thead>
<tr>
<th>Nº</th>
<th>Quando</th>
<th>Nome</th>
<th>E-mail</th>
<th>Assunto</th>
<th>Mensagem</th>
</tr>
</thead>
<tbody>
<?php foreach ($mensagens as $m): ?>
<tr>
<td><?php echo $m["id"]; ?></td>
<td><?php echo date("d/m/Y H:i", strtotime($m["criada_em"])); ?></td>
<td><?php echo htmlspecialchars($m["nome"]); ?></td>
<td><?php echo htmlspecialchars($m["email"]); ?></td>
<td><?php echo htmlspecialchars($m["assunto"]); ?></td>
<td><?php echo htmlspecialchars($m["mensagem"]); ?></td>
</tr>
<?php endforeach; ?>
</tbody>
</table>
<p><a href="../frontend/index.html#contato">← Voltar para a página</a></p>
</section>
</main>
<footer>
<p>Ana Clara &middot; 2026 &middot; ARA0062 &middot; Newton Paiva</p>
</footer>
</body>
</html>