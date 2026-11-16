<?php
date_default_timezone_set("America/Sao_Paulo");

// 1. Recebendo e tratando os dados do formulário (o que você já tinha)
$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$assunto = $_POST['assunto'] ?? '';
$mensagem = $_POST['mensagem'] ?? '';

// Exemplo das variáveis de segurança que você já usa no seu código:
$nomeSeguro = htmlspecialchars($nome, ENT_QUOTES, 'UTF-8');
$emailSeguro = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$assuntoSeguro = htmlspecialchars($assunto, ENT_QUOTES, 'UTF-8');
$mensagemSegura = htmlspecialchars($mensagem, ENT_QUOTES, 'UTF-8');

$carimbo = "Mensagem recebida em: " . date("d/m/Y H:i:s");
$tamanho = mb_strlen($mensagem);
$limite = 500;
$sobra = $limite - $tamanho;
$copia = $_POST['copia'] ?? 'não';
$copiaSegura = htmlspecialchars($copia, ENT_QUOTES, 'UTF-8');

// 2. O BLOCO NOVO DA PRÁTICA 5 (Conexão e gravação no banco de dados)
require_once "config/conexao.php";

$sql = "INSERT INTO mensagens (nome, email, assunto, mensagem) VALUES (?, ?, ?, ?)";
$stmt = $conexao->prepare($sql);
$stmt->execute([$nome, $email, $assunto, $mensagem]);

$idMensagem = $conexao->lastInsertId();
?>

<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mensagem recebida — Ana Clara</title>
    <link rel="stylesheet" href="../frontend/css/estilo.css">
  </head>
  <body>
    <header>
      <h1>Ana Clara</h1>
      <p>Estudante de Sistemas de Informação</p>
    </header>

    <main>
      <section id="resposta">
        <h2>Obrigada, <?php echo $nomeSeguro; ?>!</h2>

        <p class="aviso"><?php echo $carimbo; ?></p>

        <!-- Mensagem com o número do protocolo do banco -->
        <p>Sua mensagem foi salva com sucesso! O protocolo é: <strong>#<?php echo $idMensagem; ?></strong></p>

        <p>Vou responder no e-mail <strong><?php echo $emailSeguro; ?></strong>.</p>

        <p>Assunto: <?php echo $assuntoSeguro; ?></p>

        <p>A sua mensagem tem <?php echo $tamanho; ?> caracteres
            — sobraram <?php echo $sobra; ?> dos <?php echo $limite; ?>.</p>

        <blockquote><?php echo nl2br($mensagemSegura); ?></blockquote>

        <p>Cópia desta mensagem solicitada: <?php echo $copiaSegura; ?>.</p>

        <p><a href="../frontend/index.html#contato">← Voltar para a página</a></p>
      </section>
    </main>

    <footer>
      <p>Ana Clara &middot; 2026 &middot; ARA0062 &middot; Newton Paiva</p>
    </footer>
  </body>
</html> 
