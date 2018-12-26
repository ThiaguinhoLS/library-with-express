/*
 * File: models/book.js
 * Date: 12-25-2018
 * Descriptions: Database models
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    pages: {
      type: Number,
      required: true,
      min: 1
    },
    createdIn: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

BookSchema.pre('save', next => {
  let dateActual = new Date();
  if (!this.createdIn) {
    this.createdIn = dateActual;
  }
  next();
});


module.exports = mongoose.model('book', BookSchema);

