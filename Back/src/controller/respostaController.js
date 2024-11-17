const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function adicionarResposta(request, response) {
    params = [request.params.id_post]

    console.log(request.params.id_post)

    const query = "SELECT respostas.texto as texto, usuarios.nome_usuario as autor FROM respostas, usuarios WHERE respostas.id_postagem = ? and respostas.id_user = usuarios.id";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Sucesso com GET!!",
                data: results
            });

        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Ops, deu problemas com GET!!",
                data: err
            })
        }
    })
}

async function salvarRespostas(request, response) {
    const params = Array(
        request.body.id_post,
        request.body.id_usuario,
        request.body.respostaTexto
    );

    const query = "INSERT INTO respostas(id_postagem, id_user, texto) VALUES(?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, deu problema!",
                    sql: err
                })
        }
    })
}

module.exports = {
    adicionarResposta,
    salvarRespostas
}