require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/endpoints.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "API Teste Helpper",
        description: "Documentation automatically generated by the <b>swagger.autogen</b> module."
    },
    host: `localhost:${process.env.APP_SSLPORT || 443}`,
    basePath: "/api",
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "Authorization",
            in: "header"
        },
    },
    definitions: {
        User: {
            $id: 1,
            $name: "Jhon Doe",
            $email: "jhondoe@teste.com",
            $password: "123456",
            $createAt : '2020-12-09 17:47:50',
            $updateAt : '2020-12-09 17:47:50'            

        },
        AddUser: {
            $name: "Jhon Doe",
            $email: "jhondoe@teste.com",
            $password: "12345"
        },
        DelUser: {
            $id: 1
        },
        SignIn: {
            $email: "adm@teste.com",
            $password: "12345678"
        }        
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')
})