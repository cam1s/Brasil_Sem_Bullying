const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function adicionarPost(request, response) {
    const params = [request.body.id_usuario];

    const query = "SELECT * FROM postagem order by id desc";

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

async function salvarPost(request, response) {
    const params = Array(
        request.body.id_usuario,
        request.body.nome_usuario,
        request.body.commentText
    );

    const query = "INSERT INTO postagem(id_user, nome_usuario, texto) VALUES(?, ?, ?)";

    connection.query(query, params, (err, results) => {
        // console.log(err, results)
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
    salvarPost,
    adicionarPost
}