## Configurando ambiênte

Na raiz do frontend, existe um arquivo `.env`, nele é configurado todas as variáveis de ambiente do projeto, uma delas é a porta de execução do react, caso seja necessário, a alteração da porta pode ser feita diretamente por este arquivo.

## Instalando dependências

Primeiro passo é executar o comando `yarn install`, o comando irá instalar todas as dependências do projeto

## Rodando em modo de desenvolvedor

Para rodar no modo de desenvolvedor, basta executar o comando `yarn start` e o projeto já irá subir na porta configurada no .env

## Gerando build do projeto

Para gerar um build do projeto execute o comando `yarn build`, os arquivos gerados pelo comando ficarão disponíveis no diretório `./dist`

## Rodando versão de build do projeto

Primeiro instale de forma global o pacote serve através do comando `yarn global add serve`, depois acesse o diretório dist `cd ./dist` e então execute o comando `serve -s`, após executado, o pacote irá mostrar o link para o servidor no qual a versão de build esta sendo executada.
