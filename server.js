/**
  * File: server.js
  * Date: 12-25-2018
  * Description: Main file.
  *
  */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;
const book = require('./app/routes/book');
const config = require('config');


// Opções da base de dados
const options = {
  auth: {
    user: 'thiaguinhols',
    pass: 'Th@654750321529'
  },
  useNewUrlParser: true
};

// Conexão com a base de dados

mongoose.connect(config.dbHost, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));

if (config.util.getEnv('NODE_ENV') != 'test') {
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// Routes
app.get('/', (request, response, next) => {
  response.json({
    message: 'Welcome library'
  });
});

app.route('/book')
  .get(book.selectAllBooks)
  .post(book.appendBook);


app.route('/book/:id')
  .get(book.selectBookForId)
  .delete(book.deleteBook)
  .put(book.updateBook);

app.listen(port);
console.log('Application running on port 3000');
module.exports = app;

