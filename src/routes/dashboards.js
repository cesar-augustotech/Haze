var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

// Usuários mais ativos (ex: top 5 por número de posts)
router.get("/usuarios-ativos", dashboardController.usuariosAtivos);

// Top imagens do mural (ex: mais bem avaliadas)
router.get("/top-imagens", dashboardController.topImagens);

// Ranking do minigame
router.get("/ranking-minigame", dashboardController.rankingMinigame);

// Atividade recente (últimos posts, imagens, comentários)
router.get("/atividade-recente", dashboardController.atividadeRecente);

// Estatísticas gerais (totais, médias, etc)
router.get("/estatisticas", dashboardController.estatisticasGerais);

// Dados para gráfico: posts por usuário
router.get("/posts-por-usuario", dashboardController.postsPorUsuario);

// Dados para gráfico: avaliações de imagens
router.get("/avaliacoes-imagens", dashboardController.avaliacoesImagens);

// Dados para gráfico: pontuações do minigame
router.get("/pontuacoes-minigame", dashboardController.pontuacoesMinigame);

module.exports = router;