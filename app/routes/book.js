/*
 * File: routes/book.js
 * Date: 12-25-2018
 * Description: Routes for API
 */

const mongoose = require('mongoose');
const Book = require('../models/book');

function selectAllBooks(request, response, next) {
  return Book.find({}).then(books => {
    response.json(books)
  })
  .catch(err => {
    return response.send(err);
  });
}

function appendBook(request, response, next) {
  const newBook = new Book(request.body);
  newBook.save()
    .then(book => {
      response.json({
        message: 'Book added successfully',
        book: book
      });
    })
    .catch(err => {
      response.send(err);
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
  Book.deleteOne({ _id: request.params.id }, function(err, result) {
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

