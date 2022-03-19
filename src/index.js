const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Ok');
});

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));
