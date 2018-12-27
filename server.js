/**
  * File: server.js
  * Date: 12-25-2018
  * Description: Main file.
  *
  */
const app = require('./app/app');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;
const book = require('./app/routes/book');
const config = require('config');


// Opções do database
const options = {
  auth: {
    user: 'thiaguinhols',
    pass: 'Th@654750321529'
  },
  useNewUrlParser: true
};

// Conexão com o database
mongoose.connect(config.dbHost, options);
const db = mongoose.connection;

// Caso ocorra um erro no database imprima no console
db.on('error', console.error.bind(console, 'Connection error'));

// Recupera a variável de ambiente
if (config.util.getEnv('NODE_ENV') != 'test') {
  app.use(morgan('combined'));
}

// Define os middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


// Rotas
app.get('/', (request, response, next) => {
  response.json({
    message: 'Welcome library'
  });
});


// Define as rotas de GET/ e POST/
app.route('/book')
  .get(book.selectAllBooks)
  .post(book.appendBook);


// Define as rotas de GET/:id, DELETE/:id e PUT/:id
app.route('/book/:id')
  .get(book.selectBookForId)
  .delete(book.deleteBook)
  .put(book.updateBook);


// Inicia o servidor
const server = app.listen(process.env.PORT || port);

console.log('Application running on port 3000');

// Exporta o server
module.exports = server;

