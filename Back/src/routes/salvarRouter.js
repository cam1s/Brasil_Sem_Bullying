const { Router } = require('express');
const router = Router();

const { salvarPost, adicionarPost } = require('../controller/salvoController');

// POST

// Serve para guardar dentro do banco

/**
  @swagger
* /post:
*  post:
*   summary:  Salva a postagem feita pelo usuário
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

router.post('/post', salvarPost);

// serve para buscar os posts

/**
  @swagger
* /buscarPosts:
*  post:
*   summary:  Posta a postagem para outro usuários
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
router.get('/buscarPosts', adicionarPost);

module.exports = router;