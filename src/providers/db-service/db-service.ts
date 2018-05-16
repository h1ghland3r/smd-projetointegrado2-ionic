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

  //INICIO DA CRIAÇÃO DAS TABELAS

  createTableUsuarios(){
    //let sql = 'DROP TABLE usuarios'
    let sql = 'CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY, nome TEXT, email TEXT, login TEXT, senha TEXT, status TEXT, lastModifiedDate DATETIME)';
    return this.db.executeSql(sql, []);
  }

  createTableEscola(){
    //let sql = 'DROP TABLE escola'
    let sql = 'CREATE TABLE IF NOT EXISTS escola(id INTEGER PRIMARY KEY, nome TEXT, status TEXT, lastModifiedDate DATETIME, userId INTEGER, FOREIGN KEY(userId) REFERENCES usuarios(id))';
    return this.db.executeSql(sql, []);
  }

  createTableTurma(){
    //let sql = 'DROP TABLE turma'
    let sql = 'CREATE TABLE IF NOT EXISTS turma(id INTEGER PRIMARY KEY, nome TEXT, status TEXT, lastModifiedDate DATETIME, escolaId INTEGER, userId INTEGER, FOREIGN KEY(userId) REFERENCES usuarios(id), FOREIGN KEY(escolaId) REFERENCES escola(id))';
    return this.db.executeSql(sql, []);
  }

  createTableAlunos(){
    //let sql = 'DROP TABLE aluno'
    let sql = 'CREATE TABLE IF NOT EXISTS aluno(id INTEGER PRIMARY KEY, nome TEXT, dataNascimento DATETIME, status TEXT, lastModifiedDate DATETIME, turmaId INTEGER, userId INTEGER, FOREIGN KEY(turmaId) REFERENCES turma(id), FOREIGN KEY(userId) REFERENCES usuarios(id))';
    return this.db.executeSql(sql, []);
  }

  createTableFotos(){
    //let sql = 'DROP TABLE fotos'
    let sql = 'CREATE TABLE IF NOT EXISTS fotos(id INTEGER PRIMARY KEY, fotoUrl TEXT, status TEXT, lastModifiedDate DATETIME, alunoId INTEGER, FOREIGN KEY(alunoId) REFERENCES aluno(id))';
    return this.db.executeSql(sql, []);
  }

  createTableGrupos(){
    //let sql = 'DROP TABLE grupo'
    let sql = 'CREATE TABLE IF NOT EXISTS grupo(id INTEGER PRIMARY KEY, nome TEXT, status TEXT, lastModifiedDate DATETIME, alunoId1 INTEGER, alunoId2 INTEGER, alunoId3 INTEGER, alunoId4 INTEGER, turmaId INTEGER, userId INTEGER, FOREIGN KEY(userId) REFERENCES usuarios(id), FOREIGN KEY(alunoId1) REFERENCES aluno(id), FOREIGN KEY(alunoId2) REFERENCES aluno(id), FOREIGN KEY(alunoId3) REFERENCES aluno(id), FOREIGN KEY(alunoId4) REFERENCES aluno(id), FOREIGN KEY(turmaId) REFERENCES turma(id))';
    return this.db.executeSql(sql, []);
  }

  createTableAvaliacaoGrupo(){
    //let sql = 'DROP TABLE avaliacaoGrupo'
    let sql = 'CREATE TABLE IF NOT EXISTS avaliacaoGrupo(id INTEGER PRIMARY KEY, nome TEXT, status TEXT, createdDate DATETIME, lastModifiedDate DATETIME, userId INTEGER, grupoId INTEGER, FOREIGN KEY(userId) REFERENCES usuarios(id), FOREIGN KEY(grupoId) REFERENCES grupo(id))';
    return this.db.executeSql(sql, []);
  }

  createTableAvaliacaoAluno(){
    //let sql = 'DROP TABLE avaliacaoAluno'
    let sql = 'CREATE TABLE IF NOT EXISTS avaliacaoAluno(id INTEGER PRIMARY KEY, funcao INTEGER, createdDate DATETIME, status TEXT, lastModifiedDate DATETIME, respostas TEXT, alunoId INTEGER, avaliacaoGrupoId INTEGER, FOREIGN KEY(alunoId) REFERENCES aluno(id), FOREIGN KEY(avaliacaoGrupoId) REFERENCES avaliacaoGrupo(id))';
    return this.db.executeSql(sql, []);
  }

  createTableAvaliacao(){
    //let sql = 'DROP TABLE avaliacao'
    let sql = 'CREATE TABLE IF NOT EXISTS avaliacao(id INTEGER PRIMARY KEY, nome TEXT, status TEXT, lastModifiedDate DATETIME, userId INTEGER, FOREIGN KEY(userId) REFERENCES usuarios(id))';
    return this.db.executeSql(sql, []);
  }

  createTableAvaliacaoPerguntas(){
    //let sql = 'DROP TABLE avaliacaoPerguntas'
    let sql = 'CREATE TABLE IF NOT EXISTS avaliacaoPerguntas(id INTEGER PRIMARY KEY, pergunta TEXT, status TEXT, lastModifiedDate DATETIME, avaliacaoId INTEGER, FOREIGN KEY(avaliacaoId) REFERENCES avaliacao(id))';
    return this.db.executeSql(sql, []);
  }

  createTableAvaliacaoRespostas(){
    //let sql = 'DROP TABLE avaliacaoRespostas'
    let sql = 'CREATE TABLE IF NOT EXISTS avaliacaoRespostas(id INTEGER PRIMARY KEY, status TEXT, lastModifiedDate DATETIME, resposta TEXT, perguntaId INTEGER, FOREIGN KEY(perguntaId) REFERENCES avaliacaoPerguntas(Id))';
    return this.db.executeSql(sql, []);
  }

  //FIM DA CRIAÇÃO DAS TABELAS

  //INICIO DA INSERÇÃO DE DADOS
  createAvaliacaoGrupo(avaliacao: any){
    let sql = 'INSERT INTO avaliacaoGrupo(nome, date, grupoId) VALUES(?,?,?)';
    return this.db.executeSql(sql, [avaliacao.nome, avaliacao.date, avaliacao.grupoId]);
  }

  getAllAvaliacoes(){
    let sql = 'SELECT * FROM avaliacoes';
    return this.db.executeSql(sql, [])
      .then(response => {
        let avaliacoes = [];
        for (let index = 0; index < response.rows.length; index++) {
          avaliacoes.push( response.rows.item(index) );
        }
        return Promise.resolve( avaliacoes );
      })
      .catch(error => Promise.reject(error));
  }

  getAvaliacaoById(id: any){
    let sql = 'SELECT * FROM avaliacoes WHERE id=?';
    return this.db.executeSql(sql, [id])
      .then( response => {
        let avaliacoes = [];
        for (let index = 0; index < response.rows.length; index++) {
          avaliacoes.push( response.rows.item(index) );
        }
        return Promise.resolve( avaliacoes );
      });
  }

  createAvaliacaoAlunos(avaliacoes: any[]){
    for (let index = 0; index < avaliacoes.length; index++) {
      let sql = 'INSERT INTO avaliacoesAlunos(date, resposta1, resposta2, resposta3, resposta4, resposta5, funcao, alunoId, avaliacaoId) VALUES(?,?,?,?,?,?,?,?,?)';
      if(index == avaliacoes.length-1){
        return this.db.executeSql(sql, [avaliacoes[index].date, avaliacoes[index].resposta1, avaliacoes[index].resposta2, avaliacoes[index].resposta3, avaliacoes[index].resposta4, avaliacoes[index].resposta5, avaliacoes[index].funcao, avaliacoes[index].alunoId, avaliacoes[index].avaliacaoId]);
      }else{
        this.db.executeSql(sql, [avaliacoes[index].date, avaliacoes[index].resposta1, avaliacoes[index].resposta2, avaliacoes[index].resposta3, avaliacoes[index].resposta4, avaliacoes[index].resposta5, avaliacoes[index].funcao, avaliacoes[index].alunoId, avaliacoes[index].avaliacaoId]);
      }
    }
  }

  getAllAvaliacoesAlunos(){
    let sql = 'SELECT * FROM avaliacoesAlunos';
    return this.db.executeSql(sql, [])
      .then(response => {
        let avaliacoes = [];
        for (let index = 0; index < response.rows.length; index++) {
          avaliacoes.push( response.rows.item(index) );
        }
        return Promise.resolve( avaliacoes );
      })
      .catch(error => Promise.reject(error));
  }

  getAvAlunosByAvaliacaoId(avaliacaoId: any){
    let sql = 'SELECT * FROM avaliacoesAlunos WHERE avaliacaoId=?';
    return this.db.executeSql(sql, [avaliacaoId])
      .then( response => {
        let avAlunos = [];
        for (let index = 0; index < response.rows.length; index++) {
          avAlunos.push( response.rows.item(index) );
        }

        return Promise.resolve( avAlunos );
      });
  }

  getAvAlunosByAlunoId(alunoId: any){
    let sql = 'SELECT * FROM avaliacoesAlunos WHERE alunoId=?';
    return this.db.executeSql(sql, [alunoId])
      .then( response => {
        let avAlunos = [];
        for (let index = 0; index < response.rows.length; index++) {
          avAlunos.push( response.rows.item(index) );
        }

        return Promise.resolve( avAlunos );
      });
  }

  getAvAlunosByFuncao(funcao: any){
    let sql = 'SELECT * FROM avaliacoesAlunos WHERE funcao=?';
    return this.db.executeSql(sql, [funcao])
      .then( response => {
        let avAlunos = [];
        for (let index = 0; index < response.rows.length; index++) {
          avAlunos.push( response.rows.item(index) );
        }

        return Promise.resolve( avAlunos );
      });
  }


  getAvaliacoesByGrupoId(grupoId: any){
    let sql = 'SELECT * FROM avaliacoes WHERE grupoId=?';
    return this.db.executeSql(sql, [grupoId])
      .then( response => {
        let avaliacoes = [];
        for (let index = 0; index < response.rows.length; index++) {
          avaliacoes.push( response.rows.item(index) );
        }

        return Promise.resolve( avaliacoes );
      });
  }

  //Inicio CRUD - Table Escolas

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

  getEscolaById(id: any){
    let sql = 'SELECT id, nome FROM escolas WHERE id=?';
    return this.db.executeSql(sql, [id])
      .then( response => {
        let escola = [];
        for (let index = 0; index < response.rows.length; index++) {
          escola.push( response.rows.item(index) );
        }
        return Promise.resolve( escola );
      });
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
    let sql = 'INSERT INTO turmas(nome, escolaId) VALUES(?,?)';
    return this.db.executeSql(sql, [turma.nome, turma.escolaId]);
  }

  updateTurma(turma: any){
    let sql = 'UPDATE turmas SET nome=?, escolaId=? WHERE id=?';
    return this.db.executeSql(sql, [turma.nome, turma.escolaId, turma.id]);
  }

  deleteTurma(turma: any){
    let sql = 'DELETE FROM turmas WHERE id=?';
    return this.db.executeSql(sql, [turma.id]);
  }

  getTurmaById(id: any){
    let sql = 'SELECT * FROM turmas WHERE id=?';
    return this.db.executeSql(sql, [id])
      .then( response => {
        let turma = [];
        for (let index = 0; index < response.rows.length; index++) {
          turma.push( response.rows.item(index) );
        }
        return Promise.resolve( turma );
      });
  }

  getTurmasByEscolaId(escolaId: any){
    let sql = 'SELECT * FROM turmas WHERE escolaId=?';
    return this.db.executeSql(sql, [escolaId])
      .then( response => {
        let turmas = [];
        for (let index = 0; index < response.rows.length; index++) {
          turmas.push( response.rows.item(index) );
        }
        return Promise.resolve( turmas );
      });
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
   let sql = 'INSERT INTO alunos(nome, turmaId) VALUES(?,?)';
   return this.db.executeSql(sql, [aluno.nome, aluno.turmaId]);
 }

 updateAluno(aluno: any){
   let sql = 'UPDATE alunos SET nome=?, turmaId=? WHERE id=?';
   return this.db.executeSql(sql, [aluno.nome, aluno.turmaId, aluno.id]);
 }

 deleteAluno(aluno: any){
   let sql = 'DELETE FROM alunos WHERE id=?';
   return this.db.executeSql(sql, [aluno.id]);
 }

 getAlunoById(id: any){
   let sql = 'SELECT * FROM alunos WHERE id=?';
   return this.db.executeSql(sql, [id])
     .then( response => {
       let aluno = [];
       for (let index = 0; index < response.rows.length; index++) {
         aluno.push( response.rows.item(index) );
       }
       return Promise.resolve( aluno );
     });
 }

 getAlunosDoGrupo(alunoId1: any, alunoId2: any, alunoId3: any, alunoId4: any){
   let sql = 'SELECT * FROM alunos WHERE id=? OR id=? OR id=? OR id=?';
   return this.db.executeSql(sql, [alunoId1, alunoId2, alunoId3, alunoId4])
     .then( response => {
       let aluno = [];
       for (let index = 0; index < response.rows.length; index++) {
         aluno.push( response.rows.item(index) );
       }
       return Promise.resolve( aluno );
     });
 }

 getAlunosByTurmaId(turmaId: any){
   let sql = 'SELECT * FROM alunos WHERE turmaId=?';
   return this.db.executeSql(sql, [turmaId])
     .then( response => {
       let alunos = [];
       for (let index = 0; index < response.rows.length; index++) {
         alunos.push( response.rows.item(index) );
       }
       return Promise.resolve( alunos );
     });
 }

 getAlunosByEscola(escolaId: any){
   let sql = 'SELECT * FROM turmas WHERE escolaId=?'
   return this.db.executeSql(sql, [escolaId])
     .then( response => {
       let turmas = [];
       for (let index = 0; index < response.rows.length; index++) {
         turmas.push( response.rows.item(index) );
       }

       let alunos = [];
       for (let i = 0; i < turmas.length; i++) {
         let sqlAlunos = 'SELECT * FROM alunos WHERE turmaId=?'
         this.db.executeSql(sqlAlunos, [turmas[i].id])
          .then (response => {
            for (let index = 0; index < response.rows.length; index++) {
              alunos.push( response.rows.item(index) );
            }
          })
       }
       return Promise.resolve( alunos );
     });
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
  let sql = 'INSERT INTO grupos(nome, alunoId1, alunoId2, alunoId3, alunoId4, turmaId) VALUES(?,?,?,?,?,?)';
  return this.db.executeSql(sql, [grupo.nome, grupo.alunoId1, grupo.alunoId2, grupo.alunoId3, grupo.alunoId4, grupo.turmaId]);
}

updateGrupo(grupo: any){
  let sql = 'UPDATE grupos SET nome=?, alunoId1=?, alunoId2=?, alunoId3=?, alunoId4=?, turmaId=? WHERE Id=?';
  return this.db.executeSql(sql, [grupo.nome, grupo.alunoId1, grupo.alunoId2, grupo.alunoId3, grupo.alunoId4, grupo.turmaId, grupo.id]);
}

deleteGrupo(grupo: any){
  let sql = 'DELETE FROM grupos WHERE id=?';
  return this.db.executeSql(sql, [grupo.id]);
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

getGrupoById(id: any){
  let sql = 'SELECT * FROM grupos WHERE id=?';
  return this.db.executeSql(sql, [id])
    .then( response => {
      let grupo = [];
      for (let index = 0; index < response.rows.length; index++) {
        grupo.push( response.rows.item(index) );
      }
      return Promise.resolve( grupo );
    });
}

getGruposByTurmaId(turmaId: any){
  let sql = 'SELECT * FROM grupos WHERE turmaId=?';
  return this.db.executeSql(sql, [turmaId])
    .then( response => {
      let grupos = [];
      for (let index = 0; index < response.rows.length; index++) {
        grupos.push( response.rows.item(index) );
      }
      return Promise.resolve( grupos );
    });
}

/*
getTesteFuncao(turmaId: any, funcao: any){
  let sql = 'SELECT * FROM grupos AS G JOIN avaliacoes AS A ON G.id = A.grupoId JOIN avaliacoesAlunos AS av ON av.avaliacaoId = A.id WHERE G.turmaId=? AND avaliacaoId=? AND funcao=?';
  return this.db.executeSql(sql, [turmaId])
    .then( response => {
      let result = [];
      //let avAlunosByFuncao = [];
      for (let index = 0; index < response.rows.length; index++) {
        result.push( response.rows.item(index) );
      }
      // for (let i = 0; i < result.length; i++) {
      //   let sqlAvAlunos = 'SELECT * FROM avaliacoesAlunos WHERE '
      //   this.db.executeSql(sqlAvAlunos, [result[i].id, funcao])
      //    .then (response => {
      //      for (let index = 0; index < response.rows.length; index++) {
      //        avAlunosByFuncao.push( response.rows.item(index) );
      //      }
      //    })
      // }

      return Promise.resolve( result );
    })
}
*/


getGruposByEscola(escolaId: any){
  let sql = 'SELECT * FROM turmas WHERE escolaId=?'
  return this.db.executeSql(sql, [escolaId])
    .then( response => {
      let turmas = [];
      for (let index = 0; index < response.rows.length; index++) {
        turmas.push( response.rows.item(index) );
      }

      let grupos = [];
      for (let i = 0; i < turmas.length; i++) {
        let sqlGrupos = 'SELECT * FROM grupos WHERE turmaId=?'
        this.db.executeSql(sqlGrupos, [turmas[i].id])
         .then (response => {
           for (let index = 0; index < response.rows.length; index++) {
             grupos.push( response.rows.item(index) );
           }
         })
      }
      return Promise.resolve( grupos );
    });
}
//Fim CRUD - Table Grupos

}
