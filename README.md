Thiner Server

============


# API

Descrição da API.


## Adicionar Usuário:

API para adicionar um usuário U.

**Method**: `POST`
**Url**: `http://URL_SERVER/api/user`

**Parâmetros**:
  - **\*** `username`: Username do usuário U.
  - **\*** `password`: Password do usuário U.
  - **\*** `email` : Email do usuário U.
  - **\*** `firstname`: Primeiro nome do usuário U.
  - **\*** `lastname`: Segundo nome do usuário U.


## Editar um Usuário:

API para editar um usuário U.

**Method**: `POST`
**Url**: `http://URL_SERVER/api/user/edit`

**Parâmetros**:
  - **\*** `username`: Username do usuário U.
  - `password`: Novo password do usuário U.
  - `email` : Novo email do usuário U.
  - `firstname`: Novo primeiro nome do usuário U.
  - `lastname`: Novo segundo nome do usuário U.


## Pesquisar Usuário:

API para pesquisar um usuário U.

**Method**: `GET`
**Url**: `http://URL_SERVER/api/user/search`

**Parâmetros**:
  - **\*** `username`: Username do usuário U à ser pesquisado.


## Login do Usuário:

API para fazer o login do usuário U.

**Method**: `GET`
**Url**: `http://URL_SERVER/api/user/login`

**Parâmetros**:
  - **\*** `username`: Username do usuário U.
  - **\*** `password`: Password do usuário U.


## Todas as informações dos usuários (Para debug):

API para visualizar todos os usuários.

**Method**: `GET`
**Url**: `http://URL_SERVER/api/user/all`


## Adicionar Contato:

API para adicionar um contato C à um usuário U.

**Method**: `POST`
**Url**: `http://URL_SERVER/api/user/contact`

**Parâmetros**:
  - **\*** `username`: Username do usuário U.
  - **\*** `DDD`: DDD do telefone.
  - **\*** `numero` : Número do telefone.
  - **\*** `operadora`: Operadora do número telefonico.


## Editar Contato:

API para editar um contato C.

**Method**: `POST`
**Url**: `http://URL_SERVER/api/user/contact/edit`

**Parâmetros**:
  - **\*** `id`: id do contato C.
  - `DDD`: DDD do telefone.
  - `numero`: Número do telefone.
  - `operadora`: Operadora do número telefonico.

