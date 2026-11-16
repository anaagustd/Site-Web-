// ===========================================================================
// ARA0062 — comportamento da página
// Gabarito da aula 07. As seções 1 a 5 são as da aula 06, sem mudança.
//
// Este arquivo é lido pelo index.html pela linha
//   <script src="js/script.js" defer></script>
// e roda NO NAVEGADOR de quem abre a página. É JavaScript do lado do
// cliente (client-side): o servidor só entrega o arquivo, e não executa
// nada dele.
//
// Ordem do arquivo:
//   1. o recado de que o arquivo está ligado                 (aula 06)
//   2. pegar um pedaço da página                             (aula 06)
//   3. a página decide: a saudação pelo horário              (aula 06)
//   4. a página reage a um clique: o botão do tema           (aula 06)
//   5. a página reage ao que se digita: o contador           (aula 06)
//   6. o formulário confere antes de enviar                  (aula 07)
//   7. a dica da mensagem muda com o assunto                 (aula 07)
//
// Numa equipe, cada seção tem um dono. É o que deixa seis pessoas
// escreverem no mesmo arquivo sem pisar umas nas outras.
// ===========================================================================


// ---------------------------------------------------------------------------
// 1. O ARQUIVO ESTÁ LIGADO
//
// console.log escreve no Console do DevTools (F12 → Console), e não na
// página. É o jeito mais simples de o JavaScript falar com você.
//
// Toda instrução termina em ponto e vírgula. E o JavaScript diferencia
// maiúsculas de minúsculas: console.log funciona; Console.Log, não.
// ---------------------------------------------------------------------------
console.log("O script.js está ligado.");


// ---------------------------------------------------------------------------
// 2. PEGAR UM PEDAÇO DA PÁGINA
//
// document é a página inteira, do jeito que o JavaScript a enxerga: uma
// árvore de elementos, o DOM.
//
// querySelector recebe um SELETOR DE CSS — o mesmo que você escreveria no
// estilo.css — e devolve o primeiro elemento que casa com ele. Se nada
// casar, devolve null, e a linha seguinte dá erro. É o erro mais comum da
// noite: um id digitado errado, ou o defer esquecido.
//
// const cria uma variável que não vai ser trocada por outra coisa. Aqui ela
// guarda o ELEMENTO, e o elemento continua o mesmo — o que muda é o texto
// dentro dele.
// ---------------------------------------------------------------------------
const saudacao = document.querySelector("#saudacao");


// ---------------------------------------------------------------------------
// 3. A PÁGINA DECIDE: A SAUDAÇÃO PELO HORÁRIO
//
// new Date() é o relógio do COMPUTADOR DE QUEM ABRIU A PÁGINA — não o do
// servidor. Um visitante em Tóquio vê "Bom dia" enquanto é noite em Belo
// Horizonte. É o client-side na prática.
//
// getHours() devolve um NÚMERO de 0 a 23. Números não levam aspas.
//
// let cria uma variável que VAI receber um valor depois: ela nasce vazia e
// um dos três caminhos do if preenche.
//
// O if testa na ordem, de cima para baixo, e para no primeiro que der
// verdadeiro. Por isso o segundo teste não precisa dizer "hora >= 12": se
// chegou até ele, é porque o primeiro já deu falso.
//
// Para testar outro horário sem esperar o relógio, troque temporariamente a
// linha da hora por:   const hora = 9;
// ---------------------------------------------------------------------------
const hora = new Date().getHours();
let cumprimento;

if (hora < 12) {
  cumprimento = "Bom dia";
} else if (hora < 18) {
  cumprimento = "Boa tarde";
} else {
  cumprimento = "Boa noite";
}

// A crase (`) cria um template literal: o que estiver dentro de ${ } é
// trocado pelo valor da variável. É bem mais legível que somar pedaços de
// texto com +.
saudacao.textContent = `${cumprimento}! Que bom que você passou por aqui.`;


// ---------------------------------------------------------------------------
// 4. A PÁGINA REAGE A UM CLIQUE: O BOTÃO DO TEMA
//
// O <link> do tema-noite.css está no <head> com o atributo disabled. Para
// o JavaScript, disabled é uma propriedade que vale true ou false — um
// BOOLEANO. O botão só inverte esse valor.
//
// O ponto de exclamação (!) é o "não": !true é false, e !false é true.
// Então  temaNoite.disabled = !temaNoite.disabled  quer dizer "o contrário
// do que está agora" — é um interruptor, e cabe numa linha.
//
// O código dentro de uma FUNÇÃO não roda quando o arquivo é lido: ele fica
// guardado, esperando alguém chamar. Quem chama é o navegador, a cada
// clique — porque o addEventListener pediu.
// ---------------------------------------------------------------------------
const botaoTema = document.querySelector("#botao-tema");
const temaNoite = document.querySelector("#tema-noite");

function trocarTema() {
  temaNoite.disabled = !temaNoite.disabled;

  // O rótulo acompanha o estado: o botão diz o que ele VAI fazer.
  if (temaNoite.disabled) {
    botaoTema.textContent = "Tema escuro";
  } else {
    botaoTema.textContent = "Tema claro";
  }
}

// ATENÇÃO: trocarTema, SEM parênteses. Com parênteses — trocarTema() — a
// função rodaria uma vez, agora, ao carregar, e o clique não faria nada.
botaoTema.addEventListener("click", trocarTema);


// ---------------------------------------------------------------------------
// 5. A PÁGINA REAGE AO QUE SE DIGITA: O CONTADOR DA MENSAGEM
//
// O evento "input" dispara a cada caractere digitado, apagado ou colado.
//
// .value é o texto que está no campo AGORA, e .length é o tamanho dele.
// .maxLength é o maxlength="500" do HTML: o limite fica escrito num lugar
// só.
//
// O JavaScript NÃO pinta o contador de outra cor. Ele só acrescenta ou tira
// a classe "alerta", e quem decide a cor é o estilo.css (seção 9). É a
// mesma regra do style="" dos ciclos 4 e 5, agora do lado do script.
// ---------------------------------------------------------------------------
const campoMensagem = document.querySelector("#mensagem");
const contador = document.querySelector("#contador");

function contarCaracteres() {
  const restam = campoMensagem.maxLength - campoMensagem.value.length;

  contador.textContent = `Restam ${restam} caracteres`;

  if (restam < 50) {
    contador.classList.add("alerta");
  } else {
    contador.classList.remove("alerta");
  }
}

campoMensagem.addEventListener("input", contarCaracteres);


// ---------------------------------------------------------------------------
// 6. O FORMULÁRIO CONFERE ANTES DE ENVIAR (aula 07, práticas 1, 2, 3, 6 e 7)
//
// O HTML já confere o que ele sabe: o required barra o campo vazio, o
// type="email" barra o e-mail sem @ e o maxlength barra a mensagem longa.
// Mas o HTML não sabe que "Al" é curto demais para um nome, nem que
// "X Æ A-12" tem número. Essas são regras DESTE formulário, e quem as
// confere é o JavaScript.
//
// A ordem do que acontece no clique em Enviar:
//   1. o navegador confere o HTML (required, type, maxlength). Se algo
//      falhar, ele mostra o balão dele e PARA: o evento submit nem acontece;
//   2. passou no HTML, o navegador dispara o evento "submit" no <form>;
//   3. a function conferirFormulario roda e decide o que dizer.
//
// E uma verdade que o ciclo 8 vai repetir: a validação do navegador é
// CONFORTO para quem preenche, não segurança. Quem quiser burlar desliga o
// JavaScript. Por isso o PHP, no servidor, confere tudo de novo.
// ---------------------------------------------------------------------------
const formulario = document.querySelector("form");
const campoNome = document.querySelector("#nome");
const campoAssunto = document.querySelector("#assunto");
const aviso = document.querySelector("#aviso");

// Prática 6 — UMA REGRA QUE OLHA LETRA POR LETRA.
//
// Um texto é uma fila de caracteres, numerados a partir do ZERO: em "Ana",
// texto[0] é "A", texto[1] é "n" e texto[2] é "a". texto.length é 3, e o
// último índice é 2 — sempre um a menos que o tamanho.
//
// O for passa por cada posição, da 0 até a última:
//   let i = 0             começa no zero
//   i < texto.length      continua enquanto houver letra
//   i++                   depois de cada volta, soma um
//
// Assim que acha um número, não adianta olhar o resto: o break PARA o laço
// na hora. Em "X Æ A-12" o laço olha sete caracteres, e não oito.
//
// A função ENTREGA a resposta com return: quem chamou temNumero(nome)
// recebe true ou false, e pode usar isso direto num if.
function temNumero(texto) {
  let achou = false;

  for (let i = 0; i < texto.length; i++) {
    if ("0123456789".includes(texto[i])) {
      achou = true;
      break;
    }
  }

  return achou;
}

function conferirFormulario(evento) {
  // Prática 1. O navegador entrega à função um objeto com tudo sobre o que
  // aconteceu — o "evento". preventDefault() cancela o comportamento de
  // fábrica, que aqui é enviar e recarregar a página.
  //
  // Por enquanto o envio é SEMPRE cancelado: não há servidor para receber.
  // No ciclo 8, quando o action apontar para o PHP, ele só será cancelado
  // quando houver problema.

  if (nome.length < 3 || nome.length > 60) {
evento.preventDefault();
aviso.textContent = "O nome precisa ter entre 3 e 60 letras.";
} else if (temNumero(nome)) {
evento.preventDefault();
aviso.textContent = "O nome não pode ter números.";
} else if (campoAssunto.value === "trabalho" && campoMensagem.value.trim().length < 20) {
evento.preventDefault();
aviso.textContent = "Conte mais sobre a proposta (mínimo 20).";
} else {
// nada de preventDefault aqui: o envio segue para o PHP
aviso.textContent = "Tudo certo! Enviando…";
}

  // Prática 7 — O WHILE. trim() tira os espaços das pontas; o while tira os
  // espaços duplos do meio. "Ana    Maria" vira "Ana Maria".
  //
  // O while repete ENQUANTO a condição for verdadeira, e serve quando não
  // se sabe quantas voltas serão: um espaço duplo, ou dez. Cada volta troca
  // um "  " por " ", e um dia não sobra nenhum — se a condição nunca ficasse
  // falsa, o laço não acabaria, e a aba travaria.
  //
  // nome é let, e não const, justamente porque o while o troca.
  let nome = campoNome.value.trim();

  while (nome.includes("  ")) {
    nome = nome.replace("  ", " ");
  }

  campoNome.value = nome;   // devolve ao campo o nome já arrumado

  // Práticas 2, 3 e 6 — A DECISÃO.
  //
  // O if testa de cima para baixo e para no primeiro verdadeiro. Por isso o
  // aviso mostra UM problema de cada vez: o primeiro que encontrar.
  //
  //   ||  "ou": basta UM dos lados ser verdadeiro
  //   &&  "e":  os DOIS lados precisam ser verdadeiros
  if (nome.length < 3 || nome.length > 60) {
    aviso.textContent = "O nome precisa ter entre 3 e 60 letras.";
  } else if (temNumero(nome)) {
    aviso.textContent = "O nome não pode ter números.";
  } else if (campoAssunto.value === "trabalho" && campoMensagem.value.trim().length < 20) {
    aviso.textContent = "Conte mais sobre a proposta (mínimo 20).";
  } else {
    aviso.textContent = "Tudo certo! (No ciclo 8, isto vai para o PHP.)";
  }
}

// O mesmo addEventListener da aula 06. O evento agora é "submit", e ele é
// do <form> — não do botão. Assim a conferência roda também quando alguém
// aperta Enter dentro de um campo.
formulario.addEventListener("submit", conferirFormulario);


// ---------------------------------------------------------------------------
// 7. A DICA DA MENSAGEM MUDA COM O ASSUNTO (aula 07, prática 4)
//
// O switch serve quando a pergunta é sempre a mesma — "quanto vale o
// assunto?" — e há uma resposta para cada valor. Ele compara com ===.
//
//   case "duvida":   "se valer duvida, comece aqui"
//   break;           "e pare aqui"
//   default:         "se não for nenhum dos casos acima"
//
// SEM O break, o JavaScript não para: ele entra no case seguinte e executa
// tudo até achar um break. Apague o primeiro break e escolha "Uma dúvida":
// a dica que aparece é a da proposta de trabalho.
//
// O evento "change" do <select> dispara quando a opção escolhida muda.
// placeholder é o texto cinza que o campo mostra enquanto está vazio — o
// atributo do HTML, lido e escrito pelo JavaScript.
// ---------------------------------------------------------------------------
function trocarDica() {
  switch (campoAssunto.value) {
    case "duvida":
      campoMensagem.placeholder = "Qual é a sua dúvida?";
      break;
    case "trabalho":
      campoMensagem.placeholder = "Conte a proposta: o que é e o prazo.";
      break;
    default:
      campoMensagem.placeholder = "Escreva a sua mensagem.";
  }
}

campoAssunto.addEventListener("change", trocarDica);

// Uma chamada ao carregar, para a dica já aparecer certa antes de a pessoa
// mexer no assunto. Repare: aqui é trocarDica() COM parênteses, porque é
// para rodar agora. No addEventListener, sem.
trocarDica();


// ---------------------------------------------------------------------------
// DESAFIOS — não fazem parte do gabarito, e estão no fim do roteiro:
//
//   a) O aviso tem a mesma cara no erro e no acerto. Com classList (aula
//      06), acrescente a classe "erro" quando houver problema e tire-a no
//      "Tudo certo!" — e crie a regra .aviso.erro no estilo.css.
//   b) O botão Limpar apaga os campos, mas o aviso continua lá. O <form>
//      tem o evento "reset": use-o para esvaziar o aviso.
//   c) Uma regra nova com laço: o nome precisa ter pelo menos DUAS
//      palavras. Conte os espaços com um for (depois do while, sobra no
//      máximo um espaço entre as palavras).
//   d) Os desafios da aula 06 continuam valendo: lembrar o tema com
//      localStorage, o contador que não volta a 500 no Limpar e o ano do
//      rodapé escrito pelo script.
// ---------------------------------------------------------------------------
