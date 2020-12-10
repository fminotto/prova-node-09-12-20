# Inicializando o projeto
    
Execute o comando npm install na pasta do projeto para a instalação das dependências

# DDL para criação das tabelas necessárias

No MySql crie um database com o nome helpper e em seguida execute os ddl´s abaixo

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `authtokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `authtokens_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# Dados de conexão

Para configurar a API para acessar a base de dados basta alterar as variáveis do arquivo .env
As variáveis de ambiente que precisam ser alteradas são as seguintes :

DB_DIALECT=mysql
DB_HOST=localhost
DB_NAME=helpper
DB_PASS=*******
DB_PORT=3306
DB_USER=root

# Inicializando a base de dados

Para criar o usuário ADM é preciso executar o comando :
    npx jest

Ao executar os testes o jest também criará o user ADM (adm@teste.com) com a senha 12345678   

# Testes utilizando o Swagger

O Swagger é um framework composto por diversas ferramentas que, independente da linguagem, auxilia a descrição, consumo e visualização de serviços de uma API REST. 

Acesse a url https://localhost:44340/doc
A interface é intuitiva e muito simples de utilizar
Faça o signin e copie o token que será gerado
Após isso clique em Authorize, cole o token e clique em Authorize
Agora todas os demais endpoints estão liberados para uso.

# Testar utilizando o Postman

# Gerando o token de acesso

No Postman utilize o verbo POST e a url https://localhost:44340/api/signin informando no body o seguinte JSON

{
    "email":"adm@teste.com",
    "password":"12345678"
}

Será retornado o sequinte

{
    "authToken": {
        "id": 1,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiaWF0IjoxNjA3NTM1MDY2LCJleHAiOjE2MDc2MjE0NjZ9.hJFLLZHecY0GtuhgoAOxemQ7mPTIuCotY0bIWhzIcrY",
        "UserId": 1,
        "updatedAt": "2020-12-09T17:31:06.153Z",
        "createdAt": "2020-12-09T17:31:06.153Z"
    }
}

Copie o token e insira no header com a key Authorization
Agora será possível fazer o consumo dos endpoints da API

# Buscar todos os usuários cadastrados

Utilize o Postman informando o verbo GET e a URL https://localhost:44340/api/users/

Será retado um JSON conforme o exemplo
[
    {
        "id": 1,
        "name": "Administrador",
        "password": "$2b$10$3gbnaT.jhXG5PShnoGHwHeW49z8li3zecvhrPrJzodmLXnVD0IJZa",
        "email": "adm@teste.com",
        "createdAt": "2020-12-09T17:22:51.000Z",
        "updatedAt": "2020-12-09T17:22:51.000Z",
        "deletedAt": null
    }
]

# Inserir um novo usuário

Utilize o Postman informando o verbo POST e a URL https://localhost:44340/api/users/
Informe o seguinto JSON no Body
{
    "name":"Eu Mesmo",
    "email": "eu@mesmo.com",
    "password": "uma senha aqui"
}

Será retornado um JSON conforme o exemplo abaixo 

{
    "id": 7,
    "name": "Eu Mesmo",
    "email": "eu@mesmo.com",
    "password": "$2b$10$30ybFewZi45e94pKqtslUeMoMmR823LIoB08Ue9bXUijfd448x7Q2",
    "updatedAt": "2020-12-09T17:47:50.035Z",
    "createdAt": "2020-12-09T17:47:50.035Z"
}

# Alterando dados do uruário

Utilize o Postman informando o verbo PUT e a URL https://localhost:44340/api/users/
Informe o seguinto JSON no Body
{
    "id": 7,
    "password": "123456"
}

Em caso de sucesso receberá a seguinte resposta

{
    "sucess": true,
    "error": false,
    "message": "Updated successfully"
}

Em caso de erro

{
    "sucess": false,
    "error": true,
    "message": "record not found"
}

# Excluir um usuário

Utilize o Postman informando o verbo PUT e a URL https://localhost:44340/api/users/
Informe o seguinto JSON no Body
{
    "id": 7
}

Em caso de sucesso receberá a seguinte resposta

{
    "sucess": true,
    "error": false,
    "message": "Deleted successfully"
}

Em caso de erro

{
    "sucess": false,
    "error": true,
    "message": "record not found"
}
