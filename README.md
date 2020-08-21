# URL Shortener

Uma API para encurtar URLs. O funcionamento é bem básico: ela permite criar um usuário e encurtar URLs para esse usuário. Quando o usuário acessa essa URL encurtada a aplicação salva que houve um acesso e redireciona ele para o link longo. No projeto, foram utilizados:
* NodeJS
* Express
* MongoDB
* Tsyringe
* NanoID
* Jest

### Produção

Necessária a instalação:
* Docker

```sh
$ cd url-shortener
$ docker-compose build
$ docker-compose up
```

Por padrão, o Docker irá expor a porta 80.

### Execução dos testes automáticos

É necessário instalar o NodeJS (v13+) e as dependências de desenvolvimento e depois utilizar o comando `test`.

```sh
$ cd url-shortener
$ npm install -D
$ yarn test
```