# diploma-frontend
<h1 align="center" style="font-family: Ubuntu; font-size: 45px; color: #333; margin-bottom: 0">
  Sistema de validação de Diplomas (Engenharia de Software 1 - UFBA)
</h1>

<!-- Description -->

<h4 align="center">
	UFBA - Instituto de Computação - MATA62 - 2022.1 - Natan Moura
</h4>

<!-- Summary -->

<h2>Guia</h2>

- [:book: Introdução](#book-introdução)
- [:rocket: Tecnologias](#rocket-tecnologias)
- [:boom: Como rodar](#boom-como-rodar)
    - [Prerequisitos](#prerequisitos)
    - [Rodando](#rodando)

<a id="doc"></a>

<div align="justify">

<a id="introdução"></a>

## :book: Introdução

Esta é uma aplicação feita com ReactJS para a disciplina MATA62, com o intuito de prover um frontend simples para um projeto de validação de diplomas de cursos.

<a id="tecnologias"></a>

## :rocket: Tecnologias

Essa aplicação utiliza as seguintes tecnologias:

- [ReactJS](https://pt-br.reactjs.org/)

<a id="como-executar"></a>

## :boom: Como rodar

#### Prerequisitos

Para rodar essa aplicação é necessário ter o [NodeJS](https://nodejs.org/en/download/) em sua máquina, incluíndo o npm.

#### Rodando

Após instalar o NodeJS são necessários os seguintes passos:

```sh
# Clone esse repositório
$ git clone https://github.com/ntsmoura/diploma-frontend

# Mova para a pasta raiz
$ cd diploma-frontend

# Instale as dependências
$ npm install

# Rode em um servidor local
$ npm start
```
Acesse http://localhost:3000 para utilizar a aplicação.

É possível ter um .env com a constante REACT_APP_API para definir a rota do backend, por padrão ela é http://localhost:5000.
	
</div>
