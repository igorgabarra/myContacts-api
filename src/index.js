const express = require('express');
const routes = require('./routes');
require('express-async-errors');

const app = express();

app.use(express.json());
app.use((error, request, response, next) => {
  console.log('---- Error handler ----');
  console.log(error);
  response.sendStatus(500);
});
app.use(routes);

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));
