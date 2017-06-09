import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

/*
 Generated class for the DbServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DbServiceProvider {

  db: SQLiteObject = null;

  constructor() {  }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  //Inicio CRUD - Table Escolas

  createTableEscola(){
    let sql = 'CREATE TABLE IF NOT EXISTS escolas(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT ); CREATE TABLE IF NOT EXISTS turmas(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, escolaId INTEGER, FOREIGN KEY(escolaId) REFERENCES escolas(id))';
    //sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';

    return this.db.executeSql(sql, []);
  }

  createEscola(escola: any){
    let sql = 'INSERT INTO escolas(nome) VALUES(?)';
    return this.db.executeSql(sql, [escola.nome]);
  }

  updateEscola(escola: any){
    let sql = 'UPDATE escolas SET nome=? WHERE id=?';
    return this.db.executeSql(sql, [escola.nome, escola.id]);
  }

  deleteEscola(escola: any){
    let sql = 'DELETE FROM escolas WHERE id=?';
    return this.db.executeSql(sql, [escola.id]);
  }

  getAllEscolas(){
    let sql = 'SELECT * FROM escolas';
    return this.db.executeSql(sql, [])
      .then(response => {
        let escolas = [];
        for (let index = 0; index < response.rows.length; index++) {
          escolas.push( response.rows.item(index) );
        }
        return Promise.resolve( escolas );
      })
      .catch(error => Promise.reject(error));
  }

  //Fim CRUD - Table Escolas


  //Inicio CRUD - Table Turmas

  createTableTurma(){
    let sql = 'CREATE TABLE IF NOT EXISTS turmas(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, escolaId INTEGER, FOREIGN KEY(escolaId) REFERENCES escolas(id))';
    return this.db.executeSql(sql, []);
  }

  createTurma(turma: any){
    let sql = 'INSERT INTO turmas(Nome, EscolaId) VALUES(?,?)';
    return this.db.executeSql(sql, [turma.Nome, turma.EscolaId]);
  }

  updateTurma(turma: any){
    let sql = 'UPDATE turmas SET Nome=?, EscolaId=? WHERE Id=?';
    return this.db.executeSql(sql, [turma.Nome, turma.EscolaId]);
  }

  deleteTurma(turma: any){
    let sql = 'DELETE FROM turmas WHERE Id=?';
    return this.db.executeSql(sql, [turma.Id]);
  }

  getAllTurmas(){
    let sql = 'SELECT * FROM turmas';
    return this.db.executeSql(sql, [])
      .then(response => {
        let turmas = [];
        for (let index = 0; index < response.rows.length; index++) {
          turmas.push( response.rows.item(index) );
        }
        return Promise.resolve( turmas );
      })
      .catch(error => Promise.reject(error));
  }

 //Fim CRUD - Table Escolas

}
