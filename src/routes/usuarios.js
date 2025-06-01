var express = require("express");
var router = express.Router();

// No topo do seu arquivo de rotas
const multer = require('multer');
const upload = multer({ dest: 'public/assets/pfp/' }); // ou outro caminho desejado

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
    console.log("Chegou no router");
    console.log(req.body);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/atualizar", upload.single('avatar'), function (req, res) {
    usuarioController.atualizar(req, res);
});

router.post("/recarregar", function(req,res){
    usuarioController.recarregar(req,res);
})

module.exports = router;