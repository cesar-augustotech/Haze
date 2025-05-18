var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL\n\n function autenticar():", email, senha);
    var instrucaoSql = `
        SELECT id, nome, email, steamId, avatar_url FROM usuarios WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, steamId) {
    console.log("ACESSEI O USUARIO MODEL\n\n function cadastrar():", nome, email, senha, steamId);
    var instrucaoSql = `
        INSERT INTO usuarios (nome, email, senha, steamId) VALUES ('${nome}', '${email}', '${senha}', '${steamId}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};