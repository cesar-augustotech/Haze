var database = require('../database/config');

// --- MURAL DE ARTE ---
function listarImagensMural() {
    var instrucaoSql = `
        SELECT 
            m.id as id, 
            m.url_imagem as imagem, 
            m.descricao as descricao, 
            m.data_envio as data, 
            u.username AS autor, 
            u.avatar_url as avatar,
            u.id as autorId,
            ROUND(AVG(av.nota), 1) AS media_avaliacao,
            COUNT(av.id) AS total_avaliacoes
        FROM imagens_mural AS m
        JOIN usuarios AS u ON m.usuario_id = u.id
        LEFT JOIN avaliacoes_imagens AS av ON av.imagem_id = m.id
        GROUP BY m.id, m.url_imagem, m.descricao, m.data_envio, u.username, u.avatar_url
        ORDER BY data DESC;
    `;
    return database.executar(instrucaoSql);
}

function cadastrarImagemMural({ url_imagem, descricao, usuarioId }) {
    var instrucaoSql = `
        INSERT INTO imagens_mural (url_imagem, descricao, usuario_id)
        VALUES ('${url_imagem}', '${descricao}', ${usuarioId});
    `;
    return database.executar(instrucaoSql);
}

function removerImagem(postId) {
    var instrucaoSql = `
    DELETE FROM avaliacoes_imagens WHERE imagem_id = ${postId};
        DELETE FROM imagens_mural WHERE id = ${postId};
    `;
    return database.executar(instrucaoSql);
}

function buscarImagemPorId(postId) {
    var instrucaoSql = `
        SELECT url_imagem FROM imagens_mural WHERE id = ${postId};
    `;
    return database.executar(instrucaoSql);
}

function avaliarImagem({ imagemId, usuarioId, nota }) {
    var instrucaoSql = `
        INSERT INTO avaliacoes_imagens (imagem_id, usuario_id, nota)
        VALUES (${imagemId}, ${usuarioId}, ${nota})
        ON DUPLICATE KEY UPDATE nota = ${nota};
    `;
    return database.executar(instrucaoSql);
}

// --- FÓRUM ---
function listarPostsForum() {
    var instrucaoSql = `
        SELECT p.id, p.titulo, p.conteudo, p.data_postagem, u.username AS autor, u.avatar_url, u.id as autorId
        FROM posts AS p
        JOIN usuarios AS u ON p.usuario_id = u.id
        ORDER BY p.data_postagem DESC;
    `;
    return database.executar(instrucaoSql);
}

function cadastrarPostForum({ titulo, conteudo, usuarioId }) {
    var instrucaoSql = `
        INSERT INTO posts (titulo, conteudo, usuario_id)
        VALUES ('${titulo}', '${conteudo}', ${usuarioId});
    `;
    return database.executar(instrucaoSql);
}
function removerPostForum(postId) {
    var instrucaoSql = `
        DELETE FROM posts WHERE id = ${postId};
    `;
    return database.executar(instrucaoSql);
}

function editarPostForum({ postId, titulo, conteudo, usuarioId }) {
    var instrucaoSql = `
        UPDATE posts
        SET titulo = '${titulo}', conteudo = '${conteudo}'
        WHERE id = ${postId} AND usuario_id = ${usuarioId};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listarImagensMural,
    cadastrarImagemMural,
    removerImagem,
    buscarImagemPorId,
    listarPostsForum,
    cadastrarPostForum,
    removerPostForum,
    editarPostForum,
    avaliarImagem
};