import _ from 'lodash';
import {replace,toggle,getVal,clearText} from './functions.js'
import {get_data_card_nodes,set_data_card_nodes,get_entry_data} from './data.js'
import './style.css';

/* GLOBALS */
let myLibrary=[] 

let updateTarget='' // store target which is going to be updated
let gmsg=''  // store msg for submission card (open/close/update)
let count=0  //count books
/* GLOBALS */

/*BOOK*/ 
function Book(id,title,author,pages){
  return {id,title,author,pages}
}

function addBook(){

  replace(cardNode,{primary:'visible-data-card',replacement:'hidden-data-card'})// close after submission
  
  const Nodes= get_data_card_nodes() //[titleNode,authorNode,pagesNode] -> get input data
  const title=Nodes[0].value;
  const author=Nodes[1].value;
  const pages= Nodes[2].value;

 count=count+1 

 addBookToLibrary(count,title,author,pages);
 displayToDOM();
 addEntriesEventListener();
 clearText(Nodes);// clear input text from submission card
  
}

function addBookToLibrary(id,title,author,pages){
  const newBook =Book(id,title,author,pages);
  myLibrary.push(newBook);
}

function deleteBook(id){
  deleteBookFromLibrary(id,count)
  
  displayToDOM()
  addEntriesEventListener()
  
}


function deleteBookFromLibrary(id){
  myLibrary.splice(id-1,1) // remove book with targeted id
  
  count=count-1
  for(let i=0;i<=count-1;i++){ // rearrange ids to books
    myLibrary[i].id=i+1
  }
}

function updateBook(){
    
  replace(cardNode,{primary:'visible-data-card',replacement:'hidden-data-card'})
  
  const Nodes= get_data_card_nodes() //[titleNode,authorNode,pagesNode]-> get input data
  const title=Nodes[0].value;
  const author=Nodes[1].value;
  const pages= Nodes[2].value;

  myLibrary[updateTarget-1].title=title 
  myLibrary[updateTarget-1].author=author
  myLibrary[updateTarget-1].pages=pages
  
  displayToDOM()
  addEntriesEventListener() 
  clearText(Nodes);
  gmsg='' // To avoid duplicate update check on next onclick for update
}
/*BOOK*/ 

function displayToDOM(){
  container.innerHTML= `${myLibrary.map((book) => `<div><ul id="${book.id}">
    <li><p>Title : ${book.title}</p></li>
    <li><p>Author : ${book.author}</p></li>
    <li><p>Pages : ${book.pages}</p></li>
    <li><button class="update">Update <i class="fa fa-pencil" aria-hidden="true"></i></button></li>
    <li><button class="delete">Delete <i class="fa fa-trash" aria-hidden="true"></i></button></li>
    </ul></div>`).join('')}`
}



  const container=document.getElementById('books-container');
  const cardNode=document.querySelector('.data-card');
  const button = document.getElementById('new-book');
  const close = document.querySelector('.close')
  const submit = document.querySelector('.submit')

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
        else{ //delete operation
          
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
    //const isHidden= cardNode.classList.contains('hidden-data-card');

    const flagCondition=cardNode.classList.contains('flag')
    const openCondition=gmsg=='open'// (gmsg=='open' || gmsg=='update') && isVisible;
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


  
