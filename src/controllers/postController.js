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
    const url_imagem = req.file ? `/assets//mural${req.file.filename}` : null;

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

module.exports = {
    listarImagensMural,
    criarImagemMural,
    listarPostsForum,
    criarPostForum
};