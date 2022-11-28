module.exports=class Library{
    constructor(){
        this.books=[]
    }

    addBookToLibrary(book){
        this.books.push(book);
    }
    deleteBookFromLibrary(id){
        this.books.splice(id-1,1); 
    }
    reArrangeBooks(total){
        for(let i=0;i<=total-1;i++){ // rearrange ids to books
            this.books[i].id=i+1
          }
    }

    updateBookFromLibrary(id,updated_title,updated_author,updated_pages){
        let targetBook = Object.create(this.books[id]) 
        
        if(!(targetBook.compareTitle(updated_title))){
          this.books[id].title=updated_title
        }
        if(!(targetBook.compareAuthor(updated_author))){
          this.books[id].author=updated_author
        }
        if(!(targetBook.comparePages(updated_pages))){
          this.books[id].pages=updated_pages
        }   
      }

      displayToDOM(container){

        container.innerHTML= `${this.books.map((book) => `<div class="wrapper"><ul id="${book.id}">
            <li><p>Title : ${book.title}</p></li>
            <li><p>Author : ${book.author}</p></li>
            <li><p>Pages : ${book.pages}</p></li>
            <li><button class="update">Update <i class="fa fa-pencil" aria-hidden="true"></i></button></li>
            <li><button class="delete">Delete <i class="fa fa-trash" aria-hidden="true"></i></button></li>
            </ul></div>`).join('')}`

      }

      addEntriesEventListener(Eventcase){
        this.books.forEach((book)=>{

            const updateButtonNode=document.getElementById(book.id)
            updateButtonNode.addEventListener('click',(e)=>{
            Eventcase(e)
            })
          })
      }
}

