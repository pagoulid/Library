var assert = require('assert');
const { test } = require('mocha');
const Book = require('../src/Class/Book');
const Library = require('../src/Class/Library');


const Book1=new Book(1,'It','Stephen King','500','completed')
const Book2=new Book(2,'Book 2','Author Two','300','completed')
const Book3=new Book(3,'Book 3','Author Three','800','completed')
const Book4=new Book(4,'Book 4','Author Four','800','completed')

const testLibrary=new Library();

testLibrary.addBookToLibrary(Book1);
testLibrary.addBookToLibrary(Book2);
testLibrary.addBookToLibrary(Book3);
testLibrary.addBookToLibrary(Book4);

describe('Testing Library functionality', function(){
    it('Add Books to Library',function(){
      assert.deepStrictEqual(testLibrary.books,[Book1,Book2,Book3,Book4]);
    }); 

    it('Delete Book from Library',function(){
        testLibrary.deleteBookFromLibrary(3)
        testLibrary.deleteBookFromLibrary(2)
        testLibrary.reArrangeBooks();
        assert.deepStrictEqual(testLibrary.books,[Book1,Book4]);
      }); 

      it('Update Book from Library',function(){
        
        testLibrary.updateBookFromLibrary(1,'It','Stephen King','1500','unfinished')
        testLibrary.updateBookFromLibrary(2,'The mystery of the universe','Stephen Hawking','300','completed')
        assert.deepStrictEqual(testLibrary.books,[Book1,Book4]);
      }); 

  });