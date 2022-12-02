/**
 * @jest-environment jsdom
 */
 import {clearText} from '../src/scripts/modules/functions'
 import {set_data_card_nodes} from '../src/scripts/modules/data'
 var assert = require('assert');
 const Book = require('../src/Class/Book');
 const Library = require('../src/Class/Library');
 const testLibrary=new Library();

 let count=0

 const TitleInput = document.createElement('input')
 const AuthorInput = document.createElement('input')
 const PagesInput = document.createElement('input')
 const StatusInput = document.createElement('input')

 const container=document.createElement('div')
 container.classList.add('books-container')


describe('Cycle Test',function(){
    set_data_card_nodes([TitleInput,AuthorInput,PagesInput,StatusInput],['It','Stephen King','500','unfinished'])

    it('Set values to input elements', () => {
        
        expect(TitleInput.value).toBe('It')
        expect(AuthorInput.value).toBe('Stephen King')
        expect(PagesInput.value).toBe('500')
        expect(StatusInput.value).toBe('unfinished')
    
      });
      
      it('Add Book with input entries to Library and clear text from inputs',function(){
        count=count+1 
        let title =TitleInput.value
        let author =AuthorInput.value 
        let pages = PagesInput.value
        let status =StatusInput.value
        const Book1=new Book(count,title,author,pages,status);
        testLibrary.addBookToLibrary(Book1)

        assert.deepStrictEqual(testLibrary.books,[Book1]);
        clearText([TitleInput,AuthorInput,PagesInput,StatusInput])
        expect(TitleInput.value).toBe('')
        expect(AuthorInput.value).toBe('')
        expect(PagesInput.value).toBe('')
        expect(StatusInput.value).toBe('')
      })

      

})

describe('Cycle Test #2',function(){
      it('1) Set values to input elements', () => {
        set_data_card_nodes([TitleInput,AuthorInput,PagesInput,StatusInput],['Book 2','Author Two','300','completed'])
        expect(TitleInput.value).toBe('Book 2')
        expect(AuthorInput.value).toBe('Author Two')
        expect(PagesInput.value).toBe('300')
        expect(StatusInput.value).toBe('completed')
    
      });

      it('1) Add Book with input entries to Library and clear text from inputs',function(){
        count=count+1 
        let title =TitleInput.value
        let author =AuthorInput.value 
        let pages = PagesInput.value
        let status =StatusInput.value
        const Book2=new Book(count,title,author,pages,status);
        testLibrary.addBookToLibrary(Book2)

        assert.deepStrictEqual(testLibrary.books[1],Book2);
        clearText([TitleInput,AuthorInput,PagesInput,StatusInput])
        expect(TitleInput.value).toBe('')
        expect(AuthorInput.value).toBe('')
        expect(PagesInput.value).toBe('')
        expect(StatusInput.value).toBe('')
      })
      
      it('1) Write to DOM',()=>{
        testLibrary.displayToDOM(container)
        expect(container.children.length).toBe(2)
    })

      it('2) Set values to input elements', () => {
        set_data_card_nodes([TitleInput,AuthorInput,PagesInput,StatusInput],['Book 3','Author Three','34','unfinished'])
        expect(TitleInput.value).toBe('Book 3')
        expect(AuthorInput.value).toBe('Author Three')
        expect(PagesInput.value).toBe('34')
        expect(StatusInput.value).toBe('unfinished')
    
      });

      it('2) Add Book with input entries to Library and clear text from inputs',function(){
        count=count+1 
        let title =TitleInput.value
        let author =AuthorInput.value 
        let pages = PagesInput.value
        let status =StatusInput.value
        const Book2=new Book(count,title,author,pages,status);
        testLibrary.addBookToLibrary(Book2)

        assert.deepStrictEqual(testLibrary.books[count-1],Book2);
        clearText([TitleInput,AuthorInput,PagesInput,StatusInput])
        expect(TitleInput.value).toBe('')
        expect(AuthorInput.value).toBe('')
        expect(PagesInput.value).toBe('')
        expect(StatusInput.value).toBe('')
      })
      
    
    it('2) Write to DOM',()=>{
        testLibrary.displayToDOM(container)
        expect(container.children.length).toBe(3)
    })

})

describe('Cycle Test #3',function(){
    it('1) Delete Book and overwrite changes to DOM accordingly',()=>{
        count=count-1
        testLibrary.deleteBookFromLibrary(2)
        testLibrary.reArrangeBooks()
        testLibrary.displayToDOM(container)
        expect(testLibrary.books[0]).toEqual({"author": "Stephen King", "id": 1, "pages": "500", "status": "unfinished", "title": "It"})
        expect(testLibrary.books[1]).toEqual({"author": "Author Three", "id": 2, "pages": "34", "status": "unfinished", "title": "Book 3"})
        expect(testLibrary.books.length).toBe(2)
        expect(container.children.length).toBe(2)
    })

    it('2) Set values to input elements', () => {
        set_data_card_nodes([TitleInput,AuthorInput,PagesInput,StatusInput],['Book 4','Author Four','800','completed'])
        expect(TitleInput.value).toBe('Book 4')
        expect(AuthorInput.value).toBe('Author Four')
        expect(PagesInput.value).toBe('800')
        expect(StatusInput.value).toBe('completed')
    
      });

      it('2) Add Book with input entries to Library and clear text from inputs',function(){
        count=count+1 
        let title =TitleInput.value
        let author =AuthorInput.value 
        let pages = PagesInput.value
        let status =StatusInput.value
        const Book3=new Book(count,title,author,pages,status);
        testLibrary.addBookToLibrary(Book3)

        assert.deepStrictEqual(testLibrary.books[count-1],Book3);
        clearText([TitleInput,AuthorInput,PagesInput,StatusInput])
        expect(TitleInput.value).toBe('')
        expect(AuthorInput.value).toBe('')
        expect(PagesInput.value).toBe('')
        expect(StatusInput.value).toBe('')
      })
    
    it('2) Write to DOM',()=>{
        testLibrary.displayToDOM(container)
        expect(container.children.length).toBe(3)
    })
    it('3) Update Book and write changes to DOM',()=>{
        testLibrary.updateBookFromLibrary(2,'The mystery of the universe','Stephen Hawking','300','completed')
        testLibrary.displayToDOM(container)
        expect(testLibrary.books[1]).toEqual({"author": "Stephen Hawking", "id": 2, "pages": "300", "status": "completed", "title": "The mystery of the universe"})
        expect(testLibrary.books.length).toBe(3)
        expect(container.children.length).toBe(3)
    })
    it('4) Delete books and update',()=>{
        testLibrary.deleteBookFromLibrary(1)
        testLibrary.reArrangeBooks()
        testLibrary.deleteBookFromLibrary(2)
        testLibrary.reArrangeBooks()
        testLibrary.updateBookFromLibrary(1,'The mystery of the universe','St.Hawking','500','unfinished')
        testLibrary.displayToDOM(container)
        expect(testLibrary.books[0]).toEqual({"author": "St.Hawking", "id": 1, "pages": "500", "status": "unfinished", "title": "The mystery of the universe"})
        expect(testLibrary.books.length).toBe(1)
        expect(container.children.length).toBe(1)

    })
})






