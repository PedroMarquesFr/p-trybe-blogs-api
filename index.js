require('dotenv').config();
const express = require('express');
const middlewares = require('./middlewares');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use(middlewares.logs);

app.use(router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use(middlewares.errors);

app.listen(process.env.PORT, () =>
  console.log(`ouvindo porta ${process.env.PORT}!`));
