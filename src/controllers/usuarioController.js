var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    console.log(`\n\nEntrou na autenticar: ${email} ${senha}`);
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                if (resultadoAutenticar.length == 1) {
                    console.log("Usuário encontrado com sucesso!");
                    res.json(resultadoAutenticar[0]);
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var steamId = req.body.steamIdServer;
    console.log(`\n\nEntrou na cadastrar: ${nome} ${email} ${senha} ${steamId}`);

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (steamId == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, steamId)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function recarregar (req,res) {
    var id = req.body.idServer;
    console.log(id)

    usuarioModel.recarregar(id)
    .then(function (resultado){
        res.json(resultado);
    })
    .catch(
        function(erro){
            console.log(erro);
            console.log("\nHouve um erro ao recarregar o sessionStorage! Erro: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        }
    )
}


const fs = require('fs');
const path = require('path');

function atualizar(req, res) {
    var id = req.body.idServer;
    var nome = req.body.userServer;
    var bio = req.body.bioServer;
    var steamId = req.body.steamIdServer;
    var avatar_url = req.file ? '/assets/pfp/' + req.file.filename : null;

    if (id == undefined) {
        res.status(400).send("O id está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (bio == undefined) {
        res.status(400).send("A bio está undefined!");
    } else if (steamId == undefined) {
        res.status(400).send("O Steam ID está undefined!");
    } else {
        // Se houver nova imagem, remova a antiga (exceto placeholder)
        if (avatar_url) {
            usuarioModel.recarregar(id)
                .then(function (resultado) {
                    const usuarioAtual = Array.isArray(resultado) ? resultado[0] : resultado;
                    if (
                        usuarioAtual.avatar_url &&
                        usuarioAtual.avatar_url !== '/assets/pfp/default.png' &&  
                        usuarioAtual.avatar_url !== avatar_url
                    ) {
                        const caminhoAntigo = path.join(__dirname, '../../public', usuarioAtual.avatar_url);
                        fs.unlink(caminhoAntigo, err => {
                            if (err) console.log('Erro ao remover avatar antigo:', err.message);
                        });
                    }
                    // Agora atualiza o usuário
                    usuarioModel.atualizar(id, nome, bio, steamId, avatar_url)
                        .then(function (resultado) {
                            res.json(resultado);
                        })
                        .catch(function (erro) {
                            console.log(erro);
                            console.log("\nHouve um erro ao atualizar o usuário! Erro: ", erro.sqlMessage);
                            res.status(500).json(erro.sqlMessage);
                        });
                })
                .catch(function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                });
        } else {
            usuarioModel.atualizar(id, nome, bio, steamId, avatar_url)
                .then(function (resultado) {
                    res.json(resultado);
                })
                .catch(function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao atualizar o usuário! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                });
        }
    }
}
module.exports = {
    autenticar,
    cadastrar,
    recarregar,
    atualizar
}