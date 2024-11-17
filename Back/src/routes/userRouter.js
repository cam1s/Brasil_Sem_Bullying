const { Router } = require('express');
const router = Router();

const { login } = require('../controller/userController');

// POST

/**
* @swagger
* /login:
*  post:
*   summary:  Acessa usuário cadastrado
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

router.post('/login', login);

module.exports = router;