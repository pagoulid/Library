var assert = require('assert');
[tvalid,avalid,pvalid] = require('../src/scripts/validation/validation');

describe('Validation of given entries for book creation #1', function(){
  it('It should be accepted as title',function(){
    assert.equal(tvalid('It'),true);
  }); 

  it('Stephen King should be accepted as author',function(){
    assert.equal(avalid('Stephen King'),true);
  }); 

  it('500 pages input format is accepted',function(){
    assert.equal(pvalid('500'),true);
  }); 
  
});

describe('Validation of given entries for book creation #2', function(){
  it('Number 23 should be accepted as title',function(){
    assert.equal(tvalid('Number 23'),true);
  }); 

  it('23 Jim Carreys should not be accepted as author',function(){
    assert.equal(avalid('23 Jim Carreys'),false);
  }); 

  it('one hundred pages input format is not  accepted',function(){
    assert.equal(pvalid('one hundred'),false);
  }); 
  
});

/*expect(tvalid('It')).toBe(true);
  expect(avalid('Stephen King')).toBe(true);
  expect(pvalid('500')).toBe(true);*/