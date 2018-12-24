/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http')
var chai = require('chai')
var assert = chai.assert
var server = require('../server')

chai.use(chaiHttp)

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
    chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.isArray(res.body, 'response should be an array')
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount')
        assert.property(res.body[0], 'title', 'Books in array should contain title')
        assert.property(res.body[0], '_id', 'Books in array should contain _id')
        done()
      })
  })
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', async () => {
        let res = await chai.request(server)
          .post('/api/books/')
          .type('form')
          .send({title: 'Some great test book'})

        assert.equal(res.status, 200)
        assert.isObject(res.body, 'response should be an object')
        assert.property(res.body, 'comments', 'Book should contain commentcount')
        assert.isArray(res.body.comments, 'comments should be an array')
        assert.property(res.body, '_id', 'Book should contain _id')
        assert.property(res.body, 'title', 'Book should contain title')
        assert.equal(res.body.title, 'Some great test book', 'title should be correct')
        return res
      })
      
      test('Test POST /api/books with no title given', async() => {
        let res = await chai.request(server)
          .post('/api/books/')
          .type('form')
          .send({title: ''})

        assert.equal(res.status, 200)
        assert.isObject(res.body, 'response should be an object')
        assert.equal(res.text, 'Please enter a book title', 'title should be present')
        return res
      })
      
    })


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books', async() => {
        let res = await chai.request(server)
          .get('/api/books')

        assert.equal(res.status, 200)
        assert.isArray(res.body, 'response should be an array')
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount')
        assert.property(res.body[0], 'title', 'Books in array should contain title')
        assert.property(res.body[0], '_id', 'Books in array should contain _id')
        return res
      })      
      
    })


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db', async() => {
        let res = await chai.request(server)
          .get('/api/books/invalidId')

        assert.equal(res.status, 200)
        assert.isObject(res.body, 'response should be an object')
        assert.equal(res.text, 'no book exists')
        return res
      })
      
      test('Test GET /api/books/[id] with valid id in db', async() => {
        let setup = await chai.request(server)
          .post('/api/books/')
          .type('form')
          .send({title: 'Some great test book'})

        const id = (setup.body._id)

        let res = await chai.request(server)
          .get(`/api/books/${id}`)
          
        assert.equal(res.status, 200)
        assert.isObject(res.body, 'response should be an object')
        assert.property(res.body, 'comments', 'Book should contain comments')
        assert.isArray(res.body.comments, 'comments is an array')
        assert.property(res.body, 'title', 'Book should contain title')
        assert.property(res.body, '_id', 'Books should contain _id')
        assert.equal(res.body._id, id, 'Book should have correct id')

        return res
      })
      
    })


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', async () => {
        let setup = await chai.request(server)
          .post('/api/books/')
          .type('form')
          .send({title: 'Another great test book'})

        const id = (setup.body._id)
        const testComment = 'I like this test book'

        let res = await chai.request(server)
          .post(`/api/books/${id}`)
          .type('form')
          .send({comment: testComment})
          
        assert.equal(res.status, 200)
        assert.isObject(res.body, 'response should be an object')
        assert.property(res.body, 'title', 'Book should contain title')
        assert.property(res.body, '_id', 'Books should contain _id')
        assert.equal(res.body._id, id, 'Book should have correct id')
        assert.property(res.body, 'comments', 'Book should contain comments')
        assert.isArray(res.body.comments, 'comments is an array')
        assert.equal(res.body.comments[0], testComment)

        return res
      })
      
    })

  })

})
