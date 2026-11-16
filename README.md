# Página pessoal — Fulano de Tal

**Assunto:** a página pessoal de um estudante de Sistemas de Informação, onde
quem chega vê quem ele é, o que ele estuda, os horários do semestre e como
entrar em contato.
**Equipe:** Fulano de Tal (líder) · Beatriz Andrade Lima · Carlos Nogueira Reis · Daniela Prado Vieira · Eduardo Salles Campos · Fernanda Toledo Ramos
**Disciplina:** ARA0062 — Desenvolvimento Web em HTML5, CSS, JavaScript e PHP
**Centro Universitário Newton Paiva · 2026/2**

> **Este é o ponto de partida da aula 08** — a página de exemplo exatamente
> como ficou no fim da aula 07, com as sete práticas de validação feitas e o
> envio **sempre cancelado**, porque ainda não há servidor. Use-o se a sua
> cópia não estiver funcionando ou se você faltou à aula 07.
>
> O gabarito da aula 08 é o `02-projeto`. Não trabalhe nele: confira o seu
> **no fim**.

---

## Sobre o projeto

Uma página pessoal de estudante, feita à mão desde a aula 02. Quem chega nela
é alguém que quer saber quem é o autor: um colega de turma, um professor, ou
alguém que recebeu o link numa candidatura de estágio. O que essa pessoa vem
fazer aqui é ler uma apresentação curta, olhar os horários de aula e mandar
uma mensagem pelo formulário.

Dos ciclos 8 a 10 a página ganha o envio de verdade: o formulário passa a
gravar as mensagens num banco de dados, com uma página que lista o que foi
recebido.

---

## Identidade visual

As decisões estão aplicadas em `frontend/css/estilo.css`, todas no `:root`, e
não mudaram neste ciclo.

| Papel | Cor | Por que esta |
|---|---|---|
| `--principal` | `#88005b` | o magenta da Newton Paiva: a página é de um aluno da instituição, e o cabeçalho assume isso |
| `--sobre-principal` | `#ffffff` | branco é o único que passa com folga em cima do magenta |
| `--barra` | `#560035` | o mesmo magenta escurecido, para o menu e o rodapé |
| `--apoio` | `#053e60` | o azul institucional, onde a informação é técnica — `h3` e cabeçalho da tabela |
| `--realce` | `#dfa03f` | o dourado só aparece no contorno do foco, onde precisa gritar |
| `--fundo` | `#f4eff2` | um cinza com um pingo de magenta, para o cartão branco do conteúdo se destacar |
| `--superficie` | `#ffffff` | o branco do conteúdo, onde mora o texto longo |
| `--texto` | `#231f20` | quase preto, e não preto puro: cansa menos em texto corrido |

**Fonte:** `"Poppins"`, com plano B `"Segoe UI", Arial, Helvetica, sans-serif`
· **Escala:** `h1` 2.5rem · `h2` 1.75rem · `h3` 1.25rem · corpo 1rem
· **Segundo tema:** `frontend/css/tema-noite.css`, um modo escuro que só
redefine as variáveis de cor.

---

## JavaScript

Todo o comportamento está em `frontend/js/script.js`, ligado ao `index.html`
por `<script src="js/script.js" defer>`. Não há JavaScript dentro do HTML:
nenhum `<script>` com código e nenhum `onclick=""`.

### O que a página faz

| Comportamento | Onde se vê | Como funciona |
|---|---|---|
| **Saudação pelo horário** | a frase logo abaixo do nome, no cabeçalho | lê a hora do computador de quem visita e escolhe entre *Bom dia*, *Boa tarde* e *Boa noite* com `if` / `else if` / `else` |
| **Botão de tema** | o botão *Tema escuro* do cabeçalho | um clique liga ou desliga o `<link>` do `tema-noite.css` (propriedade `disabled`) e troca o rótulo do botão |
| **Contador da mensagem** | embaixo do campo *Mensagem* | a cada tecla, mostra quantos caracteres ainda cabem; faltando menos de 50, acrescenta a classe `alerta` |
| **Validação do formulário** | o aviso embaixo dos botões, ao clicar em *Enviar* | o evento `submit` cancela o envio e confere as regras abaixo, uma de cada vez, com `if` / `else if` |
| **Dica da mensagem** | o texto cinza dentro do campo *Mensagem* | muda conforme o *Assunto* escolhido, com `switch` |

### As regras da validação

O HTML confere primeiro: `required` nos campos obrigatórios, `type="email"` no
e-mail e `maxlength` na mensagem. O JavaScript confere o que o HTML não sabe:

| Campo | Regra | Estrutura usada |
|---|---|---|
| Nome | os espaços duplos do meio são tirados antes de conferir | `while` |
| Nome | entre 3 e 60 caracteres, sem contar os espaços das pontas | `if` com `\|\|` |
| Nome | nenhum número — `X Æ A-12` é recusado | `for` com `break`, numa função que devolve `true` ou `false` |
| Mensagem | se o assunto for *proposta de trabalho*, pelo menos 20 caracteres | `else if` com `&&` |
| Mensagem | a dica do campo acompanha o assunto | `switch` com `case`, `break` e `default` |

O envio fica **sempre cancelado** até o ciclo 8: ainda não há servidor para
receber os dados. O aviso diz se eles passariam.

**Console conferido** no Chrome e no Firefox, com `Ctrl + F5`: nenhuma
mensagem de erro ao carregar, ao trocar o tema, ao digitar a mensagem, ao
trocar o assunto e ao enviar com cada uma das regras quebrada.

---

## Quem fez o quê

| Integrante | Parte |
|---|---|
| Fulano de Tal | o evento `submit`, o `preventDefault` e o `<p id="aviso">` |
| Beatriz Andrade Lima | a regra do tamanho do nome, com `trim` e `\|\|` |
| Carlos Nogueira Reis | a regra da proposta de trabalho, com `&&` |
| Daniela Prado Vieira | a dica da mensagem, com `switch` |
| Eduardo Salles Campos | a função `temNumero`, com `for` e `break`, e os espaços duplos, com `while` |
| Fernanda Toledo Ramos | os testes: cada regra quebrada de propósito, em dois navegadores, e a seção JavaScript deste README |

---

## Como abrir

1. Abra **a pasta `04-projeto` inteira** no VS Code (*Arquivo → Abrir Pasta*),
   não só o `frontend/`.
2. Abra `frontend/index.html` e clique em **Go Live** (extensão Live Server).
3. Abra o DevTools (`F12`) na aba **Console**: a primeira linha deve ser
   *O script.js está ligado.*

---

## A estrutura

```
.
├─ README.md                 esta folha de rosto
├─ frontend/                 tudo o que roda no NAVEGADOR (client-side)
│   ├─ index.html
│   ├─ css/
│   │   ├─ estilo.css        a folha do projeto; a seção 10 é a do aviso
│   │   └─ tema-noite.css    o segundo tema: só variáveis
│   ├─ js/
│   │   └─ script.js         o comportamento da página, em sete seções
│   └─ img/
│       └─ foto.jpg          imagem de espaço reservado; troque pela sua
└─ backend/                  tudo o que roda no SERVIDOR (server-side)
    ├─ config/
    │   └─ conexao.php       vazio até o ciclo 8
    └─ processa-contato.php
```

---

# Notas da aula

*Esta seção não faz parte do modelo de folha de rosto — ela existe porque este
repositório é material didático. O README de vocês termina na estrutura.*

## O que mudou da aula 06 para a aula 07

| Arquivo | O que mudou |
|---|---|
| `frontend/index.html` | só o `<p id="aviso">`, no fim do formulário |
| `frontend/css/estilo.css` | só a seção 10, com `.aviso` e `.aviso:empty` |
| `frontend/css/tema-noite.css` | **nada** |
| `frontend/js/script.js` | as seções 6 e 7; as seções 1 a 5 não mudaram uma linha |

## As quatro armadilhas que este gabarito evita

1. **O `evento` que não chegou.** `function conferirFormulario(evento)` recebe
   o evento entre os parênteses. Sem ele, a linha do `preventDefault` dá
   *evento is not defined* — e, como o erro acontece antes do cancelamento, a
   página recarrega e o aviso some antes de qualquer um ler.
2. **O `break` esquecido no `switch`.** Sem ele, o caso de cima escorre para o
   de baixo: quem escolhe *Uma dúvida* vê a dica da proposta de trabalho. Não
   aparece erro nenhum no Console.
3. **O `const` que o `while` precisa trocar.** O nome é `let` porque o `while`
   o reescreve a cada volta. Com `const`, o Console diz *Assignment to
   constant variable* no primeiro nome com espaço duplo.
4. **O índice que começa em zero.** O `for` vai de `i = 0` até
   `i < texto.length`, com `<` e não `<=`. Com `<=`, a última volta lê
   `texto[texto.length]`, que não existe: o resultado é `undefined`, sem erro
   — e a regra fica errada em silêncio.
