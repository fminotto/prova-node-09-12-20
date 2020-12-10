require('mysql2/node_modules/iconv-lite').encodingExists('foo');
require('dotenv').config()
const { TestScheduler } = require('jest');
const { Sequelize } = require('sequelize');
const  Database = require('../src/database');
const usersModel = require('../src/models/users/usersModel');
const usersController = require('../src/controllers/usersController')

describe('testing index file', () => {
    test('connection database', () => {
      let db = new Database();
      expect(db.conn()).toBeTruthy()
    });

    test('Incluindo Usuário ADM', async () => {
        let db = new Database().conn();
        let users = new usersModel(db).getInstance();
        let body = JSON.parse('{"name":"Administrador", "email": "adm@teste.com", "password": "12345678"}');
        let ctrl = new usersController(users)
        await ctrl.postUsers(body).then(user=>{            
            expect(user).toBeDefined();
        }).catch(err=>{
            expect(err).toBeNull();
        }); 
      })  

    test('Incluindo Usuário', async () => {
        let db = new Database().conn();
        let users = new usersModel(db).getInstance();
        let body = JSON.parse('{"name":"Fernando Minotto", "email": "fernando@minotto.eti.br", "password": "987654"}');
        let ctrl = new usersController(users)
        await ctrl.postUsers(body).then(user=>{
            expect(user).toBeDefined();
        }).catch(err=>{
            expect(err).toBeNull();
        }); 
      })  

      test('Alterando último usuário cadastrado', async () => {
        let db = new Database().conn();
        let users = new usersModel(db).getInstance();
        let ctrl = new usersController(users)
        await ctrl.getLastId().then(async user => {
            console.log(user[0])
            let id = user[0].id
            let json = '{"id":'+ id +', "name":"Fernando Minotto", "email": "fernando@minotto.eti.br", "password": "12345"}';
            let body = JSON.parse(json);
            await ctrl.updateUsers(body).then(user=>{
                expect(user).toBeDefined();
            }).catch(err=>{
                expect(err).toBeNull();
            }); 
        })        
      })       

      test('Excluindo último usuário cadastrado', async () => {
        let db = new Database().conn();
        let users = new usersModel(db).getInstance();
        let ctrl = new usersController(users)
        await ctrl.getLastId().then(async user => {
            console.log(user[0])
            let id = user[0].id
            let json = '{"id":'+ id +'}';
            let body = JSON.parse(json);
            await ctrl.deleteUsers(body).then(user=>{
                expect(user).toBeDefined();
            }).catch(err=>{
                expect(err).toBeNull();
            }); 
        })
      })             
});