import _ from 'lodash';
import {replace,toggle,clearText} from './functions.js'
import {get_data_card_nodes,set_data_card_nodes,get_entry_data} from './data.js'
import {validTitle,validAuthor,validPages } from './validation.js';
import './style.css';

/* GLOBALS */
let myLibrary=[] 

let updateTarget='' // store target which is going to be updated
let gmsg=''  // store msg for submission card (open/close/update)
let count=0  //count books
/* GLOBALS */
/*NODES*/ 
const container=document.getElementById('books-container');
const cardNode=document.querySelector('.data-card');
const button = document.getElementById('new-book');
const close = document.querySelector('.close')
const submit = document.querySelector('.submit')
/*NODES*/ 
/*BOOK*/ 
function Book(id,title,author,pages){
  this.id=id
  this.title=title
  this.author=author
  this.pages=pages
}

Book.prototype.compareTitle=function(otherTitle){
  if(otherTitle==this.title){
    return true
  }
  return false
}
Book.prototype.compareAuthor=function(otherAuthor){
  if(otherAuthor==this.author){
    return true
  }
  return false
}
Book.prototype.comparePages=function(otherPages){
  if(otherPages==this.pages){
    return true
  }
  return false
}
/*BOOK*/ 
/*LIBRARY FUNCTIONS*/ 
function addBookToLibrary(book){
  myLibrary.push(book);
}
function deleteBookFromLibrary(id){
  myLibrary.splice(id-1,1) // remove book with targeted id
  
  count=count-1
  for(let i=0;i<=count-1;i++){ // rearrange ids to books
    myLibrary[i].id=i+1
  }
}
function updateBookFromLibrary(id,updated_title,updated_author,updated_pages){
  let targetBook = Object.create(myLibrary[id]) 
  
  if(!(targetBook.compareTitle(updated_title))){
    myLibrary[id].title=updated_title
  }
  if(!(targetBook.compareAuthor(updated_author))){
    myLibrary[id].author=updated_author
  }
  if(!(targetBook.comparePages(updated_pages))){
    myLibrary[id].pages=updated_pages
  }   
}
/*LIBRARY FUNCTIONS*/ 
/*DOM FUNCTIONS*/ 
function addBook(){
  
  const Nodes= get_data_card_nodes() //[titleNode,authorNode,pagesNode] -> get input data
  const title=Nodes[0].value;
  const author=Nodes[1].value;
  const pages= Nodes[2].value;
  const nonEmptyCondition= title!=''&&author!=''&&pages!='';
  
  if(nonEmptyCondition){
    const t_validation=validTitle(title);
    const a_validation=validAuthor(author);
    const p_validation=validPages(pages.trim());
    const validationCondition=t_validation&&a_validation&&p_validation;
    if(validationCondition){

      replace(cardNode,{primary:'visible-data-card',replacement:'hidden-data-card'})// close after submission
      count=count+1 
      const newBook =new Book(count,title,author,pages);
      addBookToLibrary(newBook)//(count,title,author,pages);
      displayToDOM();
      addEntriesEventListener();
      clearText(Nodes);// clear input text from submission card

    }
    else{

      if(!t_validation){
        alert('Title must contain only letters and/or numbers');
      }
      if(!a_validation){
        alert('Author must contain only letters');
      }
      if(!p_validation){
        alert('Pages must contain only numbers');
      }

    }
  }
  else{
      alert('Cannot submit empty input field')
    }
  }
 
function deleteBook(id){
  deleteBookFromLibrary(id,count)
  displayToDOM()
  addEntriesEventListener()
}

function updateBook(){

  const Nodes= get_data_card_nodes() //[titleNode,authorNode,pagesNode]-> get input data
  const title=Nodes[0].value.trim();
  const author=Nodes[1].value.trim();
  const pages= Nodes[2].value.trim();
  const nonEmptyCondition= title!=''&&author!=''&&pages!='';

  if(nonEmptyCondition){
    const t_validation=validTitle(title);
    const a_validation=validAuthor(author);
    const p_validation=validPages(pages.trim());
    const validationCondition=t_validation&&a_validation&&p_validation;
    if(validationCondition){

      replace(cardNode,{primary:'visible-data-card',replacement:'hidden-data-card'})

      updateBookFromLibrary(updateTarget-1,title,author,pages)
      displayToDOM()
      addEntriesEventListener() 
      clearText(Nodes);
      gmsg='' // To avoid duplicate update check on next onclick for update
    }
    else{
      if(!t_validation){
        alert('Title must contain only letters and/or numbers');
      }
      if(!a_validation){
        alert('Author must contain only letters');
      }
      if(!p_validation){
        alert('Pages must contain only numbers');
      }
    } 
  }
  else{
    alert('Cannot submit empty input field');
  }
}

function displayToDOM(){
  container.innerHTML= `${myLibrary.map((book) => `<div class="wrapper"><ul id="${book.id}">
    <li><p>Title : ${book.title}</p></li>
    <li><p>Author : ${book.author}</p></li>
    <li><p>Pages : ${book.pages}</p></li>
    <li><button class="update">Update <i class="fa fa-pencil" aria-hidden="true"></i></button></li>
    <li><button class="delete">Delete <i class="fa fa-trash" aria-hidden="true"></i></button></li>
    </ul></div>`).join('')}`
}
/*DOM FUNCTIONS*/
/*EVENT LISTENERS*/
button.addEventListener('click',()=>{show_data_card('open',null)})
close.addEventListener('click',()=>{show_data_card('close',null)})
submit.addEventListener('click',(e)=>{
  e.preventDefault()
  submit_data()
})

function addEntriesEventListener(){
  myLibrary.forEach((book)=>{

    const updateButtonNode=document.getElementById(book.id)
    updateButtonNode.addEventListener('click',(e)=>{

      const clickedButton= e.target.textContent; // target is the button user clicked
      if(clickedButton.includes('Update')){
        show_data_card('update',e.currentTarget.id);
      }
      else{ 
        deleteBook(e.currentTarget.id) // currentTarget is the card user clicked on
      }   
    })
  })  
}
/*EVENT LISTENERS*/
/*SUBMIT CARD*/ 
function submit_data(){
  if(gmsg=='open'){ // what button did user clicked on (update or + to add??)
    addBook()
  }
  else if(gmsg=='update'){
    updateBook()
  }
}

function show_data_card(msg,target){ // need target for to get book id for update
  const prev_msg = gmsg // Keep old msg , if old msg and new msg are both update then do not do nothing
  gmsg=msg
  
  const isVisible= cardNode.classList.contains('visible-data-card');
  const flagCondition=cardNode.classList.contains('flag')
  const openCondition=gmsg=='open'
  const updateCondition= gmsg=='update';
  const prevUpdateCondition = prev_msg=='update';
  const closeCondition= gmsg=='close';
  const visibleCondition=(openCondition || updateCondition) && isVisible;
  const updateDupCondition= !(prevUpdateCondition && updateCondition); // avoid duplicates clicks

  if(closeCondition){
    const Nodes=get_data_card_nodes() 
    Nodes[0].value=''
    Nodes[1].value=''
    Nodes[2].value=''
  }
  if(!(visibleCondition)){

    if(flagCondition){
      replace(cardNode,{primary:'flag',replacement:'visible-data-card'})
    }
    else{

      if(updateDupCondition){
        toggle(cardNode,['hidden-data-card','visible-data-card'])
      }
      if(updateCondition){
          const entryContent=get_entry_data(target)//[entryTitle,entryAuthor,entryPages]
          const Nodes = get_data_card_nodes()
          set_data_card_nodes(Nodes,entryContent) // to display entry values on data card inputs
          updateTarget=target // store target to global variable to use it when handling update submission
      }
    }

  }
} 
/*SUBMIT CARD*/


  
