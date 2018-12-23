
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  comments: [String]
})

const booksModel = mongoose.model('books', bookSchema)

booksModel.addComment = function(id, comment) {

  return this.findByIdAndUpdate(
    id,
    { $push: {comments: comment} },
    { new: true }
  )
}


booksModel.addBook = function(title) {

  return this.create({
    title: title,
    comments: []
  })
}


booksModel.deleteBook = function(id) {

  return this.deleteOne({
    _id: id
  })
}


booksModel.deleteAllBooks = function() {

  return this.deleteMany({})
}


booksModel.getOneBook = function(id) {

  return this.findById(id)
}


booksModel.getAllBooks = function() {

  return this.find()
}

module.exports = booksModel