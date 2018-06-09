import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

import { EscolasPageModule } from '../../pages/escolas/escolas.module';
import { TurmasPageModule } from '../../pages/turmas/turmas.module';
import { AlunosPageModule } from '../../pages/alunos/alunos.module';
import { GruposPageModule } from '../../pages/grupos/grupos.module';


@Injectable()
export class DbServiceProvider {

  db: SQLiteObject = null;

  constructor() { }

  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  //INICIO DA CRIAÇÃO DAS TABELAS

  createTableUsuarios() {
    //let sql = 'DROP TABLE usuarios'
    let sql = 'CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, login TEXT, senha TEXT, status TEXT, lastModifiedDate DATETIME)';
    return this.db.executeSql(sql, []);
  }

  createTableEscola() {
    //let sql = 'DROP TABLE escola'
    let sql = 'CREATE TABLE IF NOT EXISTS escola(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, status TEXT, lastModifiedDate DATETIME, userId INTEGER)';
    return this.db.executeSql(sql, []);
  }

  createTableTurma() {
    //let sql = 'DROP TABLE turma'
    let sql = 'CREATE TABLE IF NOT EXISTS turma(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, status TEXT, lastModifiedDate DATETIME, escolaId INTEGER, userId INTEGER)';
    return this.db.executeSql(sql, []);
  }

  createTableAlunos() {
    //let sql = 'DROP TABLE aluno'
    let sql = 'CREATE TABLE IF NOT EXISTS aluno(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, dataNascimento DATETIME, status TEXT, lastModifiedDate DATETIME, turmaId INTEGER, userId INTEGER)';
    return this.db.executeSql(sql, []);
  }

  createTableFotos() {
    //let sql = 'DROP TABLE fotos'
    let sql = 'CREATE TABLE IF NOT EXISTS fotos(id INTEGER PRIMARY KEY AUTOINCREMENT, fotoUrl TEXT, status TEXT, lastModifiedDate DATETIME, alunoId INTEGER)';
    return this.db.executeSql(sql, []);
  }

  createTableGrupos() {
    //let sql = 'DROP TABLE grupo'
    let sql = 'CREATE TABLE IF NOT EXISTS grupo(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, status TEXT, lastModifiedDate DATETIME, alunoId1 INTEGER, alunoId2 INTEGER, alunoId3 INTEGER, alunoId4 INTEGER, turmaId INTEGER, userId INTEGER)';
    return this.db.executeSql(sql, []);
  }

  createTableAvaliacaoGrupo() {
    //let sql = 'DROP TABLE avaliacaoGrupo'
    let sql = 'CREATE TABLE IF NOT EXISTS avaliacaoGrupo(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, status TEXT, createdDate DATETIME, lastModifiedDate DATETIME, userId INTEGER, grupoId INTEGER)';
    return this.db.executeSql(sql, []);
  }

  createTableAvaliacaoAluno() {
    //let sql = 'DROP TABLE avaliacaoAluno'
    let sql = 'CREATE TABLE IF NOT EXISTS avaliacaoAluno(id INTEGER PRIMARY KEY AUTOINCREMENT, funcao INTEGER, createdDate DATETIME, status TEXT, lastModifiedDate DATETIME, respostas TEXT, alunoId INTEGER, avaliacaoGrupoId INTEGER)';
    return this.db.executeSql(sql, []);
  }

  createTableAvaliacao() {
    //let sql = 'DROP TABLE avaliacao'
    let sql = 'CREATE TABLE IF NOT EXISTS avaliacao(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, status TEXT, lastModifiedDate DATETIME, userId INTEGER)';
    return this.db.executeSql(sql, []);
  }

  createTableAvaliacaoPerguntas() {
    //let sql = 'DROP TABLE avaliacaoPerguntas'
    let sql = 'CREATE TABLE IF NOT EXISTS avaliacaoPerguntas(id INTEGER PRIMARY KEY AUTOINCREMENT, pergunta TEXT, status TEXT, lastModifiedDate DATETIME, avaliacaoId INTEGER)';
    return this.db.executeSql(sql, []);
  }

  createTableAvaliacaoRespostas() {
    //let sql = 'DROP TABLE avaliacaoRespostas'
    let sql = 'CREATE TABLE IF NOT EXISTS avaliacaoRespostas(id INTEGER PRIMARY KEY AUTOINCREMENT, status TEXT, lastModifiedDate DATETIME, resposta TEXT, perguntaId INTEGER)';
    return this.db.executeSql(sql, []);
  }

  //FIM DA CRIAÇÃO DAS TABELAS

  //Inicio CRUD - Table Escolas

  insertEscola(escola: EscolasPageModule) {
    let sql = 'INSERT INTO escola(nome, status, lastModifiedDate, userId) VALUES(?,?,?,?)';
    return this.db.executeSql(sql, [escola.nome, escola.status, escola.lastModifiedDate, escola.userId]);
  }

  updateEscola(escola: any) {
    let sql = 'UPDATE escola SET nome=?, status=?, lastModifiedDate=?, userId=? WHERE id=?';
    return this.db.executeSql(sql, [escola.nome, escola.status, escola.lastModifiedDate, escola.userId, escola.id]);
  }

  deleteEscola(escola: EscolasPageModule) {
    let sql = 'DELETE FROM escola WHERE id=?';
    return this.db.executeSql(sql, [escola.id]);
  }

  getEscolaById(id: any) {
    let sql = 'SELECT id, nome, status, lastModifiedDate, userId FROM escola WHERE id=?';
    return this.db.executeSql(sql, [id])
      .then(response => {
        let escola = [];
        for (let index = 0; index < response.rows.length; index++) {
          escola.push(response.rows.item(index));
        }
        return Promise.resolve(escola);
      });
  }

  getAllEscolas() {
    let sql = 'SELECT * FROM escola';
    return this.db.executeSql(sql, [])
      .then(response => {
        let escolas = [];
        for (let index = 0; index < response.rows.length; index++) {
          escolas.push(response.rows.item(index));
        }
        return Promise.resolve(escolas);
      })
      .catch(error => Promise.reject(error));
  }

  //Fim CRUD - Table Escolas

  //Inicio CRUD - Table Turmas

  insertTurma(turma: TurmasPageModule) {
    let sql = 'INSERT INTO turma(nome, status, lastModifiedDate, userId, escolaId) VALUES(?,?,?,?,?)';
    return this.db.executeSql(sql, [turma.nome, turma.status, turma.lastModifiedDate, turma.userId, turma.escolaId]);
  }

  updateTurma(turma: any) {
    let sql = 'UPDATE turma SET nome=?, status=?, lastModifiedDate=?, userId=?, escolaId=? WHERE id=?';
    return this.db.executeSql(sql, [turma.nome, turma.status, turma.lastModifiedDate, turma.userId, turma.escolaId, turma.id]);
  }

  deleteTurma(turma: TurmasPageModule) {
    let sql = 'DELETE FROM turma WHERE id=?';
    return this.db.executeSql(sql, [turma.id]);
  }

  getTurmaById(id: any) {
    let sql = 'SELECT * FROM turma WHERE id=?';
    return this.db.executeSql(sql, [id])
      .then(response => {
        let turma = [];
        for (let index = 0; index < response.rows.length; index++) {
          turma.push(response.rows.item(index));
        }
        return Promise.resolve(turma);
      });
  }

  getTurmasByEscolaId(escolaId: any) {
    let sql = 'SELECT * FROM turma WHERE escolaId=?';
    return this.db.executeSql(sql, [escolaId])
      .then(response => {
        let turmas = [];
        for (let index = 0; index < response.rows.length; index++) {
          turmas.push(response.rows.item(index));
        }
        return Promise.resolve(turmas);
      });
  }

  getAllTurmas() {
    let sql = 'SELECT * FROM turma';
    return this.db.executeSql(sql, [])
      .then(response => {
        let turmas = [];
        for (let index = 0; index < response.rows.length; index++) {
          turmas.push(response.rows.item(index));
        }
        return Promise.resolve(turmas);
      })
      .catch(error => Promise.reject(error));
  }

  //Fim CRUD - Table Escolas

  //Inicio CRUD - Table Alunos

  insertAluno(aluno: AlunosPageModule) {
    let sql = 'INSERT INTO aluno(nome, dataNascimento, status, lastModifiedDate, userId, turmaId) VALUES(?,?,?,?,?,?)';
    return this.db.executeSql(sql, [aluno.nome, aluno.dataNascimento, aluno.status, aluno.lastModifiedDate, aluno.userId, aluno.turmaId]);
  }

  updateAluno(aluno: any) {
    let sql = 'UPDATE aluno SET nome=?, dataNascimento=?, status=?, lastModifiedDate=?, userId=?, turmaId=? WHERE id=?';
    return this.db.executeSql(sql, [aluno.nome, aluno.dataNascimento, aluno.status, aluno.lastModifiedDate, aluno.userId, aluno.turmaId, aluno.id]);
  }

  deleteAluno(aluno: AlunosPageModule) {
    let sql = 'DELETE FROM aluno WHERE id=?';
    return this.db.executeSql(sql, [aluno.id]);
  }

  getAlunoById(id: any) {
    let sql = 'SELECT * FROM aluno WHERE id=?';
    return this.db.executeSql(sql, [id])
      .then(response => {
        let aluno = [];
        for (let index = 0; index < response.rows.length; index++) {
          aluno.push(response.rows.item(index));
        }
        return Promise.resolve(aluno);
      });
  }

  getAlunosDoGrupo(alunoId1: any, alunoId2: any, alunoId3: any, alunoId4: any) {
    let sql = 'SELECT * FROM aluno WHERE id=? OR id=? OR id=? OR id=?';
    return this.db.executeSql(sql, [alunoId1, alunoId2, alunoId3, alunoId4])
      .then(response => {
        let aluno = [];
        for (let index = 0; index < response.rows.length; index++) {
          aluno.push(response.rows.item(index));
        }
        return Promise.resolve(aluno);
      });
  }

  getAlunosByTurmaId(turmaId: any) {
    let sql = 'SELECT * FROM aluno WHERE turmaId=?';
    return this.db.executeSql(sql, [turmaId])
      .then(response => {
        let alunos = [];
        for (let index = 0; index < response.rows.length; index++) {
          alunos.push(response.rows.item(index));
        }
        return Promise.resolve(alunos);
      });
  }

  getAlunosByEscola(escolaId: any) {
    let sql = 'SELECT * FROM turma WHERE escolaId=?'
    return this.db.executeSql(sql, [escolaId])
      .then(response => {
        let turmas = [];
        for (let index = 0; index < response.rows.length; index++) {
          turmas.push(response.rows.item(index));
        }

        let alunos = [];
        for (let i = 0; i < turmas.length; i++) {
          let sqlAlunos = 'SELECT * FROM aluno WHERE turmaId=?'
          this.db.executeSql(sqlAlunos, [turmas[i].id])
            .then(response => {
              for (let index = 0; index < response.rows.length; index++) {
                alunos.push(response.rows.item(index));
              }
            })
        }
        return Promise.resolve(alunos);
      });
  }

  getAllAlunos() {
    let sql = 'SELECT * FROM aluno';
    return this.db.executeSql(sql, [])
      .then(response => {
        let alunos = [];
        for (let index = 0; index < response.rows.length; index++) {
          alunos.push(response.rows.item(index));
        }
        return Promise.resolve(alunos);
      })
      .catch(error => Promise.reject(error));
  }

  //Fim CRUD - Table Alunos

  //Inicio CRUD - Table Grupos

  insertGrupo(grupo: GruposPageModule) {
    let sql = 'INSERT INTO grupo(nome, status, lastModifiedDate, userId, alunoId1, alunoId2, alunoId3, alunoId4, turmaId) VALUES(?,?,?,?,?,?,?,?,?)';
    return this.db.executeSql(sql, [grupo.nome, grupo.status, grupo.lastModifiedDate, grupo.userId, grupo.alunoId1, grupo.alunoId2, grupo.alunoId3, grupo.alunoId4, grupo.turmaId]);
  }

  updateGrupo(grupo: any) {
    let sql = 'UPDATE grupo SET nome=?, status=?, lastModifiedDate=?, userId=?, alunoId1=?, alunoId2=?, alunoId3=?, alunoId4=?, turmaId=? WHERE Id=?';
    //TODO testar a necessidade de incluir o campo 'id' no update
    return this.db.executeSql(sql, [grupo.nome, grupo.status, grupo.lastModifiedDate, grupo.userId, grupo.alunoId1, grupo.alunoId2, grupo.alunoId3, grupo.alunoId4, grupo.turmaId, grupo.id]);
  }

  updateAlunoGrupo(grupo: any) {
    let sql = 'UPDATE grupo SET alunoId1=?, alunoId2=?, alunoId3=?, alunoId4=? WHERE Id=?';
    return this.db.executeSql(sql, [grupo.alunoId1, grupo.alunoId2, grupo.alunoId3, grupo.alunoId4, grupo.id]);
  }

  deleteGrupo(grupo: GruposPageModule) {
    let sql = 'DELETE FROM grupo WHERE id=?';
    return this.db.executeSql(sql, [grupo.id]);
  }

  getAllGrupos() {
    let sql = 'SELECT * FROM grupo';
    return this.db.executeSql(sql, [])
      .then(response => {
        let grupos = [];
        for (let index = 0; index < response.rows.length; index++) {
          grupos.push(response.rows.item(index));
        }
        return Promise.resolve(grupos);
      })
      .catch(error => Promise.reject(error));
  }

  getGrupoById(id: any) {
    let sql = 'SELECT * FROM grupo WHERE id=?';
    return this.db.executeSql(sql, [id])
      .then(response => {
        let grupo = [];
        for (let index = 0; index < response.rows.length; index++) {
          grupo.push(response.rows.item(index));
        }
        return Promise.resolve(grupo);
      });
  }

  getGruposByTurmaId(turmaId: any) {
    let sql = 'SELECT * FROM grupo WHERE turmaId=?';
    return this.db.executeSql(sql, [turmaId])
      .then(response => {
        let grupos = [];
        for (let index = 0; index < response.rows.length; index++) {
          grupos.push(response.rows.item(index));
        }
        return Promise.resolve(grupos);
      });
  }

  getGruposByEscola(escolaId: any) {
    let sql = 'SELECT * FROM turma WHERE escolaId=?'
    return this.db.executeSql(sql, [escolaId])
      .then(response => {
        let turmas = [];
        for (let index = 0; index < response.rows.length; index++) {
          turmas.push(response.rows.item(index));
        }

        let grupos = [];
        for (let i = 0; i < turmas.length; i++) {
          let sqlGrupos = 'SELECT * FROM grupo WHERE turmaId=?'
          this.db.executeSql(sqlGrupos, [turmas[i].id])
            .then(response => {
              for (let index = 0; index < response.rows.length; index++) {
                grupos.push(response.rows.item(index));
              }
            })
        }
        return Promise.resolve(grupos);
      });
  }

  //Fim CRUD - Table Grupos

  // Inicio CRUD - Table usuarios

  checkLogin(email: string, password: string){
    let sql = 'SELECT * FROM usuarios WHERE email=? AND senha=?';

    return this.db.executeSql(sql, [email, password])
      .then(response => {
        let user = [];
        for (let index = 0; index < response.rows.length; index++) {
          user.push(response.rows.item(index));
        }
        return Promise.resolve(user);
      });
  }

  insertUsuario(usuario: any) {
    let sql = 'INSERT INTO usuarios(nome, email, login, senha, status, lastModifiedDate) VALUES(?,?,?,?,?,?)';
    return this.db.executeSql(sql, [usuario.nome, usuario.email, usuario.login, usuario.password, usuario.status, usuario.lastModifiedDate]);
  }

  getAllUsuarios() {
    let sql = 'SELECT * FROM usuarios';
    return this.db.executeSql(sql, [])
      .then(response => {
        let usuarios = [];
        for (let index = 0; index < response.rows.length; index++) {
          usuarios.push(response.rows.item(index));
        }
        return Promise.resolve(usuarios);
      })
      .catch(error => Promise.reject(error));
  }

  getUsuarioById(id: any) {
    let sql = 'SELECT * FROM usuarios WHERE id=?';
    return this.db.executeSql(sql, [id])
      .then(response => {
        let usuarios = [];
        for (let index = 0; index < response.rows.length; index++) {
          usuarios.push(response.rows.item(index));
        }
        return Promise.resolve(usuarios);
      });
  }

  // Fim CRUD - Table usuarios

  //Inicio - Avaliaçao do Grupo

  insertAvaliacaoGrupo(avaliacao: any) {
    let sql = 'INSERT INTO avaliacaoGrupo(nome, createdDate, status, lastModifiedDate, userId, grupoId) VALUES(?,?,?,?,?,?)';
    return this.db.executeSql(sql, [avaliacao.nome, avaliacao.createdDate, avaliacao.status, avaliacao.lastModifiedDate, avaliacao.userId, avaliacao.grupoId]);
  }

  getAllAvaliacoes() {
    let sql = 'SELECT * FROM avaliacaoGrupo';
    return this.db.executeSql(sql, [])
      .then(response => {
        let avaliacoes = [];
        for (let index = 0; index < response.rows.length; index++) {
          avaliacoes.push(response.rows.item(index));
        }
        return Promise.resolve(avaliacoes);
      })
      .catch(error => Promise.reject(error));
  }

  getAvaliacaoById(id: any) {
    let sql = 'SELECT * FROM avaliacaoGrupo WHERE id=?';
    return this.db.executeSql(sql, [id])
      .then(response => {
        let avaliacoes = [];
        for (let index = 0; index < response.rows.length; index++) {
          avaliacoes.push(response.rows.item(index));
        }
        return Promise.resolve(avaliacoes);
      });
  }

  getAvaliacoesByGrupoId(grupoId: any) {
    let sql = 'SELECT * FROM avaliacaoGrupo WHERE grupoId=?';
    return this.db.executeSql(sql, [grupoId])
      .then(response => {
        let avaliacoes = [];
        for (let index = 0; index < response.rows.length; index++) {
          avaliacoes.push(response.rows.item(index));
        }

        return Promise.resolve(avaliacoes);
      });
  }

  //Fim - Avaliaçao do Grupo

  //Inicio - Avaliação por Aluno

  insertAvaliacaoAlunos(avaliacoes: any[]) {
    for (let index = 0; index < avaliacoes.length; index++) {
      let sql = 'INSERT INTO avaliacaoAluno(createdDate, funcao, status, lastModifiedDate, respostas, alunoId, avaliacaoGrupoId) VALUES(?,?,?,?,?,?,?)';
      if (index == avaliacoes.length - 1) {
        return this.db.executeSql(sql, [avaliacoes[index].createdDate, avaliacoes[index].funcao, avaliacoes[index].status, avaliacoes[index].lastModifiedDate, avaliacoes[index].respostas, avaliacoes[index].alunoId, avaliacoes[index].avaliacaoGrupoId]);
      } else {
        this.db.executeSql(sql, [avaliacoes[index].createdDate, avaliacoes[index].funcao, avaliacoes[index].status, avaliacoes[index].lastModifiedDate, avaliacoes[index].respostas, avaliacoes[index].alunoId, avaliacoes[index].avaliacaoGrupoId]);
      }
    }
  }

  getAllAvaliacoesAlunos() {
    let sql = 'SELECT * FROM avaliacaoAluno';
    return this.db.executeSql(sql, [])
      .then(response => {
        let avaliacoes = [];
        for (let index = 0; index < response.rows.length; index++) {
          avaliacoes.push(response.rows.item(index));
        }
        return Promise.resolve(avaliacoes);
      })
      .catch(error => Promise.reject(error));
  }

  getAvAlunosByAvaliacaoId(avaliacaoId: any) {
    let sql = 'SELECT * FROM avaliacaoAluno WHERE avaliacaoGrupoId=?';
    return this.db.executeSql(sql, [avaliacaoId])
      .then(response => {
        let avAlunos = [];
        for (let index = 0; index < response.rows.length; index++) {
          avAlunos.push(response.rows.item(index));
        }

        return Promise.resolve(avAlunos);
      });
  }

  getAvAlunosByAlunoId(alunoId: any) {
    let sql = 'SELECT * FROM avaliacaoAluno WHERE alunoId=?';
    return this.db.executeSql(sql, [alunoId])
      .then(response => {
        let avAlunos = [];
        for (let index = 0; index < response.rows.length; index++) {
          avAlunos.push(response.rows.item(index));
        }

        return Promise.resolve(avAlunos);
      });
  }

  getAvAlunosByFuncao(funcao: any) {
    let sql = 'SELECT * FROM avaliacaoAluno WHERE funcao=?';
    return this.db.executeSql(sql, [funcao])
      .then(response => {
        let avAlunos = [];
        for (let index = 0; index < response.rows.length; index++) {
          avAlunos.push(response.rows.item(index));
        }

        return Promise.resolve(avAlunos);
      });
  }

  //Fim - Avaliação por Aluno

}
