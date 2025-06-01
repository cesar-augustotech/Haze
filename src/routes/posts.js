const express = require("express");
const router = express.Router();

const upload = require('../database/configUpload'); // importa sua config personalizada

const postController = require("../controllers/postController");

// Para o mural
router.get('/mural', postController.listarImagensMural);
router.post('/mural', upload.single('imagem'), postController.criarImagemMural);
router.delete('/remover/:id', postController.removerImagem);
router.post('/avaliar/:imagemId', postController.avaliarImagem);

// Para o fórum
router.get('/forum', postController.listarPostsForum);
router.post('/forum', postController.criarPostForum);
router.delete('/removerForum/:id', postController.removerPostForum);
router.put('/editarForum/:id', postController.editarPostForum);

module.exports = router;