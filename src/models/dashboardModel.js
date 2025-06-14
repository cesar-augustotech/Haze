var database = require("../database/config");

// Usuários mais ativos (top 10 por número de posts + imagens)
function usuariosAtivos() {
    var instrucaoSql = `
        SELECT 
            u.username,
            COALESCE(p.total_posts, 0) + COALESCE(m.total_imagens, 0) AS total_posts
        FROM usuarios u
        LEFT JOIN (
            SELECT usuario_id, COUNT(*) AS total_posts
            FROM posts
            GROUP BY usuario_id
        ) p ON u.id = p.usuario_id
        LEFT JOIN (
            SELECT usuario_id, COUNT(*) AS total_imagens
            FROM imagens_mural
            GROUP BY usuario_id
        ) m ON u.id = m.usuario_id
        ORDER BY total_posts DESC
        LIMIT 10;
    `;
    return database.executar(instrucaoSql);
}


// Top imagem do mural (mais bem avaliada)
function topImagens() {
    var instrucaoSql = `
        SELECT m.id, m.url_imagem, m.descricao, u.username AS autor, 
               ROUND(AVG(av.nota),2) AS media_avaliacao
        FROM imagens_mural m
        JOIN usuarios u ON m.usuario_id = u.id
        LEFT JOIN avaliacoes_imagens av ON av.imagem_id = m.id
        GROUP BY m.id
        ORDER BY media_avaliacao DESC
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

// Ranking do minigame (top 5)
function rankingMinigame() {
    var instrucaoSql = `
        SELECT u.username, mg.pontuacao
        FROM minigame mg
        JOIN usuarios u ON mg.usuario_id = u.id
        ORDER BY mg.pontuacao DESC
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}

// Atividade recente (últimos posts, imagens, comentários)
function atividadeRecente() {
    var instrucaoSql = `
        (SELECT 'post' AS tipo, p.titulo AS descricao, p.data_postagem AS data, u.username AS autor
         FROM posts p JOIN usuarios u ON p.usuario_id = u.id)
        UNION
        (SELECT 'imagem', m.descricao, m.data_envio, u.username
         FROM imagens_mural m JOIN usuarios u ON m.usuario_id = u.id)
        UNION
        (SELECT 'comentario', c.conteudo, c.data_comentario, u.username
         FROM comentarios c JOIN usuarios u ON c.usuario_id = u.id)
        ORDER BY data DESC
        LIMIT 10;
    `;
    return database.executar(instrucaoSql);
}

// Estatísticas gerais
function estatisticasGerais() {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(*) FROM usuarios) AS total_usuarios,
            (SELECT COUNT(*) FROM posts) AS total_posts,
            (SELECT COUNT(*) FROM imagens_mural) AS total_imagens,
            (SELECT COUNT(*) FROM comentarios) AS total_comentarios
    `;
    return database.executar(instrucaoSql);
}

// Dados para gráfico: posts + imagens por usuário
function postsPorUsuario() {
    var instrucaoSql = `
        SELECT 
            u.username,
            COALESCE(p.total_posts, 0) + COALESCE(m.total_imagens, 0) AS total_posts
        FROM usuarios u
        LEFT JOIN (
            SELECT usuario_id, COUNT(*) AS total_posts
            FROM posts
            GROUP BY usuario_id
        ) p ON u.id = p.usuario_id
        LEFT JOIN (
            SELECT usuario_id, COUNT(*) AS total_imagens
            FROM imagens_mural
            GROUP BY usuario_id
        ) m ON u.id = m.usuario_id
        ORDER BY total_posts DESC;
    `;
    return database.executar(instrucaoSql);
}

// Dados para gráfico: avaliações de imagens
function avaliacoesImagens() {
    var instrucaoSql = `
        SELECT 
            nota,
            COUNT(*) AS quantidade
        FROM avaliacoes_imagens
        GROUP BY nota
        ORDER BY nota DESC;
    `;
    return database.executar(instrucaoSql);
}

// Dados para gráfico: pontuações do minigame
function pontuacoesMinigame() {
    var instrucaoSql = `
        SELECT u.username, mg.pontuacao
        FROM minigame mg
        JOIN usuarios u ON mg.usuario_id = u.id
        ORDER BY mg.pontuacao DESC;
    `;
    return database.executar(instrucaoSql);
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