const express = require('express');
const dotenv = require ('dotenv');
const cors = require('cors');
const router = require('./routes/taskRouter');
const loginRouter = require('./routes/userRouter');
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const post = require('./routes/salvarRouter');
const coment = require('./routes/respostaRouter');
const app = express();

// Configuração do Swegger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API do TCC",
            version: "1.0.0",
            description: "API CRUD para gerenciar o site Brasil Sem Bullying",
        },
        servers: [{ url: "http://localhost:3006" }]
    },
    apis: [`${__dirname}/routes/*.js`],
};

app.set('port', process.env.PORT || 3306);
app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use('/api', loginRouter);
app.use('/api', post);
app.use('/api', coment);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;