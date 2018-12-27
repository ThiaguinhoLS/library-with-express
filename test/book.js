process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Book = require('../app/models/book');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Books', function() {

  beforeEach(function(done) {
    Book.deleteMany({}, function(err) {
      done();
    });
  });

  describe('/GET book', function() {
    it('Return all books', function(done) {
      chai.request(server)
      .get('/book')
      .end(function(err, response) {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('array');
        expect(response.body.length).to.equal(0);
      done();
      });
    });
  });

  describe('/POST book', function() {

    it('Append a book', function(done) {
      const book = {
        title: 'Ice and Fire',
        author: 'Unknown',
        year: 2018
      };
      chai.request(server)
      .post('/book')
      .send(book)
      .end(function(err, response) {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body.errors).to.have.property('pages');
        expect(response.body.errors.pages)
          .to.have.property('kind').eql('required');
        done();
      });
    });

    it('Append and return a new book', done => {
      const book = {
        title: 'Ice and Fire',
        author: 'Unknown',
        pages: 100,
        year: 2018
      };
      chai.request(server)
      .post('/book')
      .send(book)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.book).to.have.property('title');
        expect(response.body.book).to.have.property('author');
        expect(response.body.book).to.have.property('pages');
        expect(response.body.book).to.have.property('year');
        expect(response.body)
          .to.have.property('message').eql('Book added successfully');
        done();
      });
    });
  });

  describe('/GET/:id', () => {

    it('Return a book for determined id', done => {
      const book = new Book({
        title: 'Ice and Fire',
        author: 'Unknown',
        pages: 100,
        year: 2018
      });
      book.save()
      .then(book => {
        chai.request(server)
        .get(`/book/${book.id}`)
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a('object');
          expect(response.body).to.have.property('title');
          expect(response.body).to.have.property('author');
          expect(response.body).to.have.property('pages');
          expect(response.body).to.have.property('year');
          expect(response.body).to.have.property('_id').eql(book.id);
          done();
        });
      });
    });
  });

  describe('/PUT/:id', () => {

    it('Updated a determined book', done => {
      const book = new Book({
        title: 'Ice and Fire',
        author: 'Unknown',
        pages: 100,
        year: 2018
      });
      book.save()
      .then(book => {
        chai.request(server)
        .put(`/book/${book.id}`)
        .send({
          title: 'Changed a title'
        })
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a('object');
          expect(response.body)
            .to.have.property('message').eql('Book updated successfully');
          done();
        });
      });
    });
  });

  describe('/DELETE/:id', () => {

    it('Delete book for determined id', done => {
      const book = new Book({
        title: 'Ice and Fire',
        author: 'Unknown',
        pages: 100,
        year: 2018
      });
      book.save()
      .then(book => {
        chai.request(server)
        .delete(`/book/${book.id}`)
        .end((err, response) => {
          expect(response).to.have.status(200);
          done();
        });
      });
    });

  });

});

