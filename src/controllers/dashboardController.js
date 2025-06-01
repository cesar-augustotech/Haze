const dashboardModel = require("../models/dashboardModel");

function usuariosAtivos(req, res) {
    dashboardModel.usuariosAtivos().then(function (resultado) {
        console.log("Retorno usuariosAtivos:", resultado);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function topImagens(req, res) {
    dashboardModel.topImagens().then(function (resultado) {
        console.log("Retorno topImagens:", resultado);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function rankingMinigame(req, res) {
    dashboardModel.rankingMinigame().then(function (resultado) {
        console.log("Retorno rankingMinigame:", resultado);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function atividadeRecente(req, res) {
    dashboardModel.atividadeRecente().then(function (resultado) {
        console.log("Retorno atividadeRecente:", resultado);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function estatisticasGerais(req, res) {
    dashboardModel.estatisticasGerais().then(function (resultado) {
        console.log("Retorno estatisticasGerais:", resultado);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function postsPorUsuario(req, res) {
    dashboardModel.postsPorUsuario().then(function (resultado) {
        console.log("Retorno postsPorUsuario:", resultado);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function avaliacoesImagens(req, res) {
    dashboardModel.avaliacoesImagens().then(function (resultado) {
        console.log("Retorno avaliacoesImagens:", resultado);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function pontuacoesMinigame(req, res) {
    dashboardModel.pontuacoesMinigame().then(function (resultado) {
        console.log("Retorno pontuacoesMinigame:", resultado);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    usuariosAtivos,
    topImagens,
    rankingMinigame,
    atividadeRecente,
    estatisticasGerais,
    postsPorUsuario,
    avaliacoesImagens,
    pontuacoesMinigame
};