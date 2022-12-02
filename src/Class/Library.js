
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
    reArrangeBooks(){
        for(let i=0;i<=this.books.length-1;i++){ // rearrange ids to books
            this.books[i].id=i+1
           
          }
        
    }

    updateBookFromLibrary(id,updated_title,updated_author,updated_pages,updated_status){
        //let targetBook = Object.create(this.books[id]) 
        id=id-1;
        if(!(this.books[id].compareTitle(updated_title))){
          this.books[id].title=updated_title
        }
        if(!(this.books[id].compareAuthor(updated_author))){
          this.books[id].author=updated_author
        }
        if(!(this.books[id].comparePages(updated_pages))){
          this.books[id].pages=updated_pages
        }  
        
        this.books[id].status=updated_status;
      }

      displayToDOM(container){
        /* maybe add x or tick symbol for read unread */
        container.innerHTML= `${this.books.map((book) => `<div class="wrapper"><ul id="${book.id}">
            <li><p>Title : ${book.title}</p></li>
            <li><p>Author : ${book.author}</p></li>
            <li><p>Pages : ${book.pages}</p></li>
            <li><p>Status : ${book.status}</p></li>
            <li class="marker-list">${(book.status=='completed'&&'<i class="fa fa-check pmarker" aria-hidden="true"></i>') ||(book.status=='unfinished'&&'<i class="fa fa-times nmarker" aria-hidden="true"></i>') }</li>
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

