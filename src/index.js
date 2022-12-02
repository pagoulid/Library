import _ from 'lodash';
import {replace,toggle,clearText} from './scripts/modules/functions.js'
import {get_data_card_nodes,set_data_card_nodes,get_entry_data} from './scripts/modules/data.js'
import ErrorMsg from './scripts/validation/validationError.js';
import { changeStatus,resetStatus } from './scripts/modules/status.js';
import './style.css';
/* GLOBALS */ 
let updateTarget='' // store target which is going to be updated
let gmsg=''  // store msg for submission card (open/close/update)
let count=0  //count books

let statusObject = new Object(); /** To manipulate selection option on submission card */
statusObject['unfinished']=0;
statusObject['completed']=1;
/* GLOBALS */
/*LIBRARY*/
const Library=require('./Class/Library'); 
let myLibrary=new Library()
/*LIBRARY*/
/*BOOK*/ 
const Book=require('./Class/Book')
/*BOOK*/
/*VALIDATION FUNCTIONS*/
const validations=require('./scripts/validation/validation');
const validTitle=validations[0];
const validAuthor=validations[1];
const validPages=validations[2];
/*VALIDATION FUNCTIONS*/

/*NODES*/ 
const container=document.getElementById('books-container');
const cardNode=document.querySelector('.data-card');
const button = document.getElementById('new-book');
const close = document.querySelector('.close')
const submit = document.querySelector('.submit')
/*NODES*/ 
/*DOM FUNCTIONS*/ 
function addBook(){
  
  const Nodes= get_data_card_nodes(['book-title','book-author','book-pages','book-status']) //[titleNode,authorNode,pagesNode] -> get input data
  const title=Nodes[0].value;
  const author=Nodes[1].value;
  const pages= Nodes[2].value;
  const status=Nodes[3].value;
  const nonEmptyCondition= title!=''&&author!=''&&pages!='';
  
  if(nonEmptyCondition){
    const t_validation=validTitle(title);
    const a_validation=validAuthor(author);
    const p_validation=validPages(pages.trim());
    const validationCondition=t_validation&&a_validation&&p_validation;
    if(validationCondition){

      replace(cardNode,{primary:'visible-data-card',replacement:'hidden-data-card'})// close after submission
      count=count+1 
      const newBook =new Book(count,title,author,pages,status);

      myLibrary.addBookToLibrary(newBook)
      console.log('Add to library:',myLibrary.books)
      myLibrary.displayToDOM(container);
      myLibrary.addEntriesEventListener(BookEventCase);
      reset(Nodes)
    }
    else{
      ErrorMsg([t_validation,a_validation,p_validation],['Title must contain only letters and/or numbers','Author must contain only letters','Pages must contain only numbers'])
    }
  }
  else{
      alert('Cannot submit empty input field')
    }
  }
 
function deleteBook(id){
  myLibrary.deleteBookFromLibrary(id);
  count=count-1
  myLibrary.reArrangeBooks()
  console.log('Library after deletion:',myLibrary.books)
  myLibrary.displayToDOM(container);
  myLibrary.addEntriesEventListener(BookEventCase);
}

function updateBook(){

  const Nodes= get_data_card_nodes(['book-title','book-author','book-pages','book-status']) //[titleNode,authorNode,pagesNode]-> get input data
  const title=Nodes[0].value.trim();
  const author=Nodes[1].value.trim();
  const pages= Nodes[2].value.trim();
  const status= Nodes[3].value.trim();

  const nonEmptyCondition= title!=''&&author!=''&&pages!='';

  if(nonEmptyCondition){
    const t_validation=validTitle(title);
    const a_validation=validAuthor(author);
    const p_validation=validPages(pages);
    const validationCondition=t_validation&&a_validation&&p_validation;
    if(validationCondition){

      replace(cardNode,{primary:'visible-data-card',replacement:'hidden-data-card'})

      myLibrary.updateBookFromLibrary(updateTarget,title,author,pages,status)
      console.log('Library after update:',myLibrary.books) 
      myLibrary.displayToDOM(container);
      myLibrary.addEntriesEventListener(BookEventCase);
      reset(Nodes)
      gmsg='' // To avoid duplicate update check on next onclick for update
    }
    else{
      ErrorMsg([t_validation,a_validation,p_validation],['Title must contain only letters and/or numbers','Author must contain only letters','Pages must contain only numbers'])
    } 
  }
  else{
    alert('Cannot submit empty input field');
  }
}

/*EVENT LISTENERS*/
button.addEventListener('click',()=>{show_data_card('open',null)})
close.addEventListener('click',()=>{show_data_card('close',null)})
submit.addEventListener('click',(e)=>{
  e.preventDefault()
  submit_data()
})
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
    const Nodes=get_data_card_nodes(['book-title','book-author','book-pages','book-status']) 
    reset(Nodes)
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
          const Nodes = get_data_card_nodes(['book-title','book-author','book-pages','book-status'])

          Nodes.splice(3,1)
          let statusValue=entryContent[3].trim(); // get status from of book entry to change status visibility on submit card
          entryContent.splice(3,1);

          set_data_card_nodes(Nodes,entryContent) // to display entry values on data card inputs
          changeStatus(statusValue,statusObject)
          updateTarget=target // store target to global variable to use it when handling update submission   
      }
    }
  }
} 
/*SUBMIT CARD*/

function reset(Nodes){
    Nodes.splice(3,1)
    clearText(Nodes)
    resetStatus()
}  

export function BookEventCase(event){

  const clickedButton= event.target.textContent; // target is the button user clicked
  if(clickedButton.includes('Update')){
    show_data_card('update',event.currentTarget.id);
  }
  else{
    let submit_card=document.querySelector('.data-card');// Alreasdy defined on global , but define it locally to pass it to Library method
    if(submit_card.classList.contains('hidden-data-card')){// if submit card is closed
      deleteBook(event.currentTarget.id) // currentTarget is the card user clicked on
    }
    
  }

}
