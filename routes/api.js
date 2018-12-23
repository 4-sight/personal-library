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
      res.json(response)
    })
    
    .post(async (req, res) => {
      var title = req.body.title
      //response will contain new book object including at least _id and title
      let response
      try {response = await books.addBook(title)}
      catch(err) {console.error('unable to get book', err)}
      res.json (response)
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
      //json res format: {"_id": bookId, "title": book_title, "comments": [comment,comment,...]}
      let response
      try{response = await books.getOneBook(bookId)}
      catch(err) {console.error('failed to return book', err)}
      res.json(response)
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
