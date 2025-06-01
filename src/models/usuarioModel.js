var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL\n\n function autenticar():", email, senha);
    var instrucaoSql = `
        SELECT id, username, bio, email, steamId, avatar_url FROM usuarios WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, steamId) {
    
    console.log("ACESSEI O USUARIO MODEL\n\n function cadastrar():", nome, email, senha, steamId);
    var instrucaoSql = `
        INSERT INTO usuarios (username, email, senha, steamId) VALUES ('${nome}', '${email}', '${senha}', '${steamId}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function recarregar(id){

    console.log("ACESSEI O USUARIO MODEL\n\n function recarregar():", id);

    var instrucaoSql = `SELECT * FROM usuarios WHERE id = '${id}'`

     console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(id, nome, bio, steamId, avatar_url) {
    console.log("ACESSEI O USUARIO MODEL\n\n function atualizar():", id, nome, bio, steamId, avatar_url);

    let instrucaoSql = `
        UPDATE usuarios 
        SET username = '${nome}', bio = '${bio}', steamId = '${steamId}'
        ${avatar_url ? `, avatar_url = '${avatar_url}'` : ''}
        WHERE id = '${id}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    recarregar,
    atualizar
};