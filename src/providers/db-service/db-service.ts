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
    let sql = 'CREATE TABLE IF NOT EXISTS escolas(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT );' +
    'CREATE TABLE IF NOT EXISTS turmas(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, escolaId INTEGER, FOREIGN KEY(escolaId) REFERENCES escolas(id));' +
    'CREATE TABLE IF NOT EXISTS alunos(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, turmaId INTEGER, FOREIGN KEY(turmaId) REFERENCES turmas(Id));' +
    'CREATE TABLE IF NOT EXISTS grupos(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, alunoId1 INTEGER, alunoId2 INTEGER, alunoId3 INTEGER, alunoId4, FOREIGN KEY(alunoId1) REFERENCES alunos(Id), FOREIGN KEY(alunoId2) REFERENCES alunos(Id), FOREIGN KEY(alunoId3) REFERENCES alunos(Id), FOREIGN KEY(alunoId4) REFERENCES alunos(Id))';
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

  getEscolaById(escola: any){
    let sql = 'SELECT * FROM escolas WHERE id=?';
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

 //Inicio CRUD - Table Alunos

 createAluno(aluno: any){
   let sql = 'INSERT INTO alunos(Nome, TurmaId) VALUES(?,?)';
   return this.db.executeSql(sql, [aluno.Nome, aluno.TurmaId]);
 }

 updateAluno(aluno: any){
   let sql = 'UPDATE alunos SET Nome=?, TurmaId=? WHERE Id=?';
   return this.db.executeSql(sql, [aluno.Nome, aluno.TurmaId]);
 }

 deleteAluno(aluno: any){
   let sql = 'DELETE FROM alunos WHERE Id=?';
   return this.db.executeSql(sql, [aluno.Id]);
 }

 getAllAlunos(){
   let sql = 'SELECT * FROM alunos';
   return this.db.executeSql(sql, [])
     .then(response => {
       let alunos = [];
       for (let index = 0; index < response.rows.length; index++) {
         alunos.push( response.rows.item(index) );
       }
       return Promise.resolve( alunos );
     })
     .catch(error => Promise.reject(error));
 }

//Fim CRUD - Table Alunos

//Inicio CRUD - Table Grupos

createGrupo(grupo: any){
  let sql = 'INSERT INTO alunos(Nome, alunoId1, alunoId2, alunoId3, alunoId4) VALUES(?,?,?,?,?)';
  return this.db.executeSql(sql, [grupo.Nome, grupo.alunoId1, grupo.alunoId2, grupo.alunoId3, grupo.alunoId4]);
}

updateGrupo(grupo: any){
  let sql = 'UPDATE alunos SET Nome=?, TurmaId=? WHERE Id=?';
  return this.db.executeSql(sql, [aluno.Nome, aluno.TurmaId]);
}

deleteGrupo(grupo: any){
  let sql = 'DELETE FROM grupos WHERE Id=?';
  return this.db.executeSql(sql, [grupo.Id]);
}

getAllGrupos(){
  let sql = 'SELECT * FROM grupos';
  return this.db.executeSql(sql, [])
    .then(response => {
      let grupos = [];
      for (let index = 0; index < response.rows.length; index++) {
        grupos.push( response.rows.item(index) );
      }
      return Promise.resolve( grupos );
    })
    .catch(error => Promise.reject(error));
}

//Fim CRUD - Table Grupos

}
