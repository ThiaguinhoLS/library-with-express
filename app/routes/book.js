/*
 * File: routes/book.js
 * Date: 12-25-2018
 * Description: Routes for API
 */

const mongoose = require('mongoose');
const Book = require('../models/book');

function selectAllBooks(request, response, next) {
  const query = Book.find({});
  query.exec(function(err, books) {
    if (err) {
      response.send(err);
    }
    response.json(books);
  });
}

function appendBook(request, response, next) {
  const newBook = new Book(request.body);
  newBook.save(function(err, book) {
    if (err) {
      response.send(err);
    }
    response.json({
      message: 'Book added successfully',
      livro: livro
    });
  });
}

function selectBookForId(request, response, next) {
  Book.findById(request.params.id, function(err, book) {
    if (err) {
      response.send(err);
    }
    response.json(book);
  });
}

function deleteBook(request, response, next) {
  Book.remove({ _id: request.params.id }, function(err, result) {
    response.json({
      message: 'Book removed successfully',
      result: result
    });
  });
}

function updateBook(request, response, next) {
  Book.findById({ _id: request.params.id }, function(err, book) {
    if (err) {
      response.send(err);
    }
    Object.assign(book, request.body).save(function(err, book) {
      if (err) {
        response.send(err);
      }
      response.json({
        message: 'Book updated successfully',
        book: book
      });
    });
  });
}

module.exports = {
  selectAllBooks, appendBook, selectBookForId, deleteBook, updateBook
}

