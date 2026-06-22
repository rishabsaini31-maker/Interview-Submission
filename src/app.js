const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

const swaggerDocument = yaml.load(__dirname + '/../swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', routes);

app.use(errorHandler);

module.exports = app;