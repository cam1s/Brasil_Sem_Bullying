const { Router } = require('express');
const router = Router();

const { adicionarResposta, salvarRespostas } = require('../controller/respostaController');

// serve para buscar os posts

/**
  @swagger
* /adicionarResposta:
*  get:
*   summary:  Posta a resposta para outros usuários
*   responses:
*    200:
*     description: Sucesso!
*     content:
*      application/json:
*       schema:
*        type: array
*        items:
*         type: object
*/
router.get('/adicionarResposta/:id_post',  adicionarResposta);

// Serve para guardar dentro do banco

/**
  @swagger
* /salvarResposta:
*  post:
*   summary:  Salva resposta dos comentários
*   responses:
*    200:
*     description: Sucesso!
*     content:
*      application/json:
*       schema:
*        type: array
*        items:
*         type: object
*/
router.post('/salvarResposta',  salvarRespostas);

module.exports = router;