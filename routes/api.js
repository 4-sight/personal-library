/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict'

const books = require('../models/books.js')

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookId, "title": book_title, "commentcount": num_of_comments },...]
      let response
      try {response = await books.getAllBooks()}
      catch(err) {console.error('Unable to retrieve books', err)}
      if (!response) {
        res.send('no books exist')
      } else {
        res.json(response.map(
          book => {
            return {
              title: book.title,
              _id: book._id,
              commentcount: book.comments.length
            }
          }
        ))
      }
    })
    
    .post(async (req, res) => {
      var title = req.body.title
      //response will contain new book object including at least _id and title
      let response
      try {response = await books.addBook(title)}
      catch(err) {console.error('unable to get book', err)}
      if (!response) {
        res.send('no book exists')
      } else {
        res.json({
          title: response.title,
          comments: response.comments,
          id: response._id,
        })
      }
    })
    
    .delete(async (req, res) => {
      //if successful response will be 'complete delete successful'
      try{ await books.deleteAllBooks() }
      catch(err) {console.error('Error whilst performing complete delete', err)}
      res.send('complete delete successful')
    })



  app.route('/api/books/:id')
    .get(async (req, res) => {
      var bookId = req.params.id
      console.log(bookId)
      //json res format: {"_id": bookId, "title": book_title, "comments": [comment,comment,...]}
      let response
      try{response = await books.getOneBook(bookId)}
      catch(err) {
        console.error('book could not be found', err)}
      if (!response) {
        res.send('no book exists')
      } else {
        res.json({
          _id: response._id,
          title: response.title,
          comments: response.comments
        })
      }
    })
    
    .post(async (req, res) => {
      var bookId = req.params.id
      var comment = req.body.comment
      //json res format same as .get
      let response
      try{response = await books.addComment(bookId, comment)}
      catch(err) {console.error('Failed to add comment', err)}
      res.json(response)
    })
    
    .delete(async (req, res) =>{
      var bookId = req.params.id
      //if successful response will be 'delete successful'
      try{await books.deleteBook(bookId)}
      catch(err) {console.error('Error whilst deleting book', err)}
      res.send('delete successful')
    })
  
}
