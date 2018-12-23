
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  commentcount: Number
})

const booksModel = mongoose.model('books', bookSchema)

module.exports = booksModel