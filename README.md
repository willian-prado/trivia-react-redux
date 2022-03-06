## Projeto Trivia

> Sétimo projeto do módulo de Front-end do curso de desenvolvimento web da Trybe.

Segundo projeto em grupo do módulo de Front-end, focado novamente na prática de metodologias ágeis e também nos conteúdos de React e Redux vistos até esse ponto.
Um quadro no aplicativo Trello foi usado como ferramenta Kanban, onde os requisitos do projeto foram divididos entre os membros do grupo.
Alguns requisitos eram pré-requisitos básicos para a aplicação e foram desenvolvidos em grupo ou em *pair-programming*.

**Objetivo do projeto**

Desenvolver um jogo de perguntas e respostas baseado no jogo Trivia usando React e Redux.
A página inicial pede ao usuário que digite seu nome e e-mail. Através do e-mail, uma busca será realizada no site [Gravatar](https://pt.gravatar.com/) para verificar se há uma foto de usuário associada ao e-mail, caso exista, ela será utilizada em seu perfil na aplicação.

O jogo consiste em uma sequência de perguntas e respostas. Cada pergunta possui quatro alternativas e a cada acerto a pontuação do usuário é registrada em uma placar no header da página. Há ainda um cronômetro, que caso chegue a zero, assume que a resposta foi incorreta.
Ao final de cada jogo, é possível acessar o ranking com as melhores pontuações registradas.
As perguntas e respostas são obtidas via [API do Trivia](https://opentdb.com/api_config.php).

**Principais habilidades desenvolvidas nesse trabalho:**

  - Criar um store Redux em aplicações React
  - Criar reducers no Redux em aplicações React
  - Criar actions no Redux em aplicações React
  - Criar dispatchers no Redux em aplicações React
  - Conectar Redux aos componentes React
  - Criar actions assíncronas na sua aplicação React que faz uso de Redux.
  - Praticar a metodologia ágil Kanban

*Projeto desenvolvido em grupo com Antônio Malato, Eduardo Ribeiro, Emerson Filho, Guilherme Cesconeto*

---

### Lista de requisitos propostos:

#### Obrigatórios

#### 1. Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo
#### 2. Crie o botão de iniciar o jogo
#### 3. Crie um botão que leva a pessoa para tela de configuração
#### 4. Crie um _header_ que deve conter as informações da pessoa jogadora
#### 5. Crie a página de jogo que deve conter as informações relacionadas à pergunta
#### 6. Desenvolva o jogo onde só deve ser possível escolher uma resposta correta por pergunta
#### 7. Desenvolva o estilo que, ao clicar em uma resposta, a correta deve ficar verde e as incorretas, vermelhas
#### 8. Desenvolva um timer onde a pessoa que joga tem 30 segundos para responder
#### 9. Crie um placar e ao clicar na resposta correta, pontos devem ser somados no placar da pessoa que está jogando
#### 10. Crie um botão de "próxima" que apareça após a resposta ser dada
#### 11. Desenvolva o jogo de forma que a pessoa que joga deve responder 5 perguntas no total
#### 12. Desenvolva o header de _feedback_ que deve conter as informações da pessoa jogadora
#### 13. Crie a mensagem de _feedback_ para ser exibida a pessoa usuária após o término do jogo
#### 14. Exiba as informações relacionadas aos resultados obtidos para a pessoa usuária
#### 15. Crie um botão para poder jogar novamente
#### 16. Crie um botão para a pessoa jogadora poder visualizar a tela de _ranking_
#### 17. Crie a tela de _ranking_ que deve ficar armazenada no local storage
#### 18. Crie um botão para poder ir ao início

#### Extra não avaliativo

**Crie uma tela de configurações**

##### 19. Ao mudar o valor do dropdown categoria, apenas perguntas da categoria selecionada devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave category no retorno da API;

##### 20. Ao mudar o valor do dropdown dificuldade, apenas perguntas da dificuldade selecionada devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave difficulty no retorno da API;

##### 21. Ao mudar o valor do dropdown tipo, apenas perguntas do tipo selecionado devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave type no retorno da API.

***Obs: A maneira como a API deve ser estruturada segue o seguinte modelo: https://opentdb.com/api_config.php***
