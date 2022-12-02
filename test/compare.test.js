var assert = require('assert');
const Book = require('../src/Class/Book');
const sampleBook=new Book(1,'It','Stephen King','500','completed')


describe('Compare if given entries are the same with the attributes of the Book #1', function(){
    it('Input title (It) matches with Book entry(It)',function(){
      assert.equal(sampleBook.compareTitle('It'),true);
    }); 
  
    it('Input author (Stephen King) matches with Book entry(Stephen King)',function(){
      assert.equal(sampleBook.compareAuthor('Stephen King'),true);
    }); 
  
    it('Input pages (500) matches with Book entry(500)',function(){
      assert.equal(sampleBook.comparePages('500'),true);
    }); 
    
  });

  describe('Compare if given entries are the same with the attributes of the Book #2', function(){
    it('Input title (I) do not match with Book entry(It)',function(){
      assert.equal(sampleBook.compareTitle('I'),false);
    }); 
  
    it('Input author (Steph King) do not  match with Book entry (Steph King)',function(){
      assert.equal(sampleBook.compareAuthor('Steph King'),false);
    }); 
  
    it('Input pages (499) do not match with Book entry (500)',function(){
      assert.equal(sampleBook.comparePages('499'),false);
    }); 
    
  });
