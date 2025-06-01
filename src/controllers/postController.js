var postModel = require('../models/postModel');

// --- MURAL DE ARTE ---
function listarImagensMural(req, res) {
    postModel.listarImagensMural()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function criarImagemMural(req, res) {
    const { descricao, usuarioId } = req.body;
    // multer salva o arquivo em req.file
    const url_imagem = req.file ? `/assets/mural/${req.file.filename}` : null;

    if (!url_imagem || !usuarioId) {
        return res.status(400).send("Campos obrigatórios faltando!");
    }
    postModel.cadastrarImagemMural({ url_imagem, descricao, usuarioId })
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

const fs = require('fs');
const path = require('path');

function removerImagem(req, res) {
    const postId = req.params.id;

    if (!postId) {
        return res.status(400).send("ID do post não informado!");
    }

    // Primeiro, busque o caminho da imagem no banco
    postModel.buscarImagemPorId(postId)
        .then(function (resultado) {
            const imagem = Array.isArray(resultado) ? resultado[0] : resultado;
            if (imagem && imagem.url_imagem) {
                // Remova o arquivo do diretório (exceto placeholder, se quiser)
                if (!imagem.url_imagem.includes('default.png')) {
                    const caminhoArquivo = path.join(__dirname, '../../public', imagem.url_imagem);
                    fs.unlink(caminhoArquivo, err => {
                        if (err) console.log('Erro ao remover arquivo:', err.message);
                    });
                }
            }
            // Agora remova do banco
            postModel.removerImagem(postId)
                .then(function () {
                    res.json({ ok: true });
                })
                .catch(function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}
function avaliarImagem(req, res) {
    const imagemId = req.params.imagemId;
    const { usuarioId, nota } = req.body;
    if (!imagemId || !usuarioId || !nota) {
        return res.status(400).send("Campos obrigatórios faltando!");
    }
    postModel.avaliarImagem({ imagemId, usuarioId, nota })
        .then(() => res.json({ ok: true }))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

// --- FÓRUM ---
function listarPostsForum(req, res) {
    postModel.listarPostsForum()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function criarPostForum(req, res) {
    const { titulo, conteudo, usuarioId } = req.body;
    if (!titulo || !conteudo || !usuarioId) {
        return res.status(400).send("Campos obrigatórios faltando!");
    }
    postModel.cadastrarPostForum({ titulo, conteudo, usuarioId })
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}
function removerPostForum(req, res) {
    const postId = req.params.id;
    if (!postId) {
        return res.status(400).send("ID do post não informado!");
    }
    postModel.removerPostForum(postId)
        .then(function () {
            res.json({ ok: true });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function editarPostForum(req, res) {
    const postId = req.params.id;
    const { titulo, conteudo, usuarioId } = req.body;
    if (!postId || !titulo || !conteudo || !usuarioId) {
        return res.status(400).send("Campos obrigatórios faltando!");
    }
    postModel.editarPostForum({ postId, titulo, conteudo, usuarioId })
        .then(function () {
            res.json({ ok: true });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

// No final do arquivo, adicione as funções ao exports:
module.exports = {
    listarImagensMural,
    criarImagemMural,
    removerImagem,
    listarPostsForum,
    criarPostForum,
    removerPostForum,
    editarPostForum,
    avaliarImagem
};