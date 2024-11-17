const { Router } = require('express');
const router = Router();

const { storeTask } = require('../controller/taskController');

// GET

/**
  @swagger
* /store/tasks:
*  post:
*   summary:  Cadastra usuário
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
router.post('/store/task', storeTask);

module.exports = router;