import _ from 'lodash';
import {replace,toggle,getVal,clearText} from './functions.js'
import {get_data_card_nodes,set_data_card_nodes,get_entry_data} from './data.js'

import './style.css';

let myLibrary=[]

let updateTarget=''
let gmsg=''
let count=0 

function Book(id,title,author,pages){
  return {id,title,author,pages}
}

function addBook(){

  replace(cardNode,{primary:'visible-data-card',replacement:'hidden-data-card'})
  const Nodes= get_data_card_nodes() //[titleNode,authorNode,pagesNode]

  const title=Nodes[0].value;
  const author=Nodes[1].value;
  const pages= Nodes[2].value;

 count=count+1 

 addBookToLibrary(count,title,author,pages);
 displayToDOM();
 addUpdateEventListener();
 clearText(Nodes);
  
}

function addBookToLibrary(id,title,author,pages){
  const newBook =Book(id,title,author,pages);
  myLibrary.push(newBook);
}

function deleteBook(id){
  deleteBookFromLibrary(id,count)
  
  displayToDOM()
  addUpdateEventListener()
  console.log(myLibrary)
}


function deleteBookFromLibrary(id){
  myLibrary.splice(id-1,1)
  count=count-1

  for(let i=0;i<=count-1;i++){
    myLibrary[i].id=i+1
  }
}

function updateBook(){
    
  replace(cardNode,{primary:'visible-data-card',replacement:'hidden-data-card'})
  
  const Nodes= get_data_card_nodes() //[titleNode,authorNode,pagesNode]
  const title=Nodes[0].value;
  const author=Nodes[1].value;
  const pages= Nodes[2].value;

  myLibrary[updateTarget-1].title=title // Note updateTarget is stored target from update click button
  myLibrary[updateTarget-1].author=author
  myLibrary[updateTarget-1].pages=pages
  
  displayToDOM()
  addUpdateEventListener() // Also update event listeners
  clearText(Nodes);
  gmsg='' // To avoid duplicate update check on next onclick for update
}

function displayToDOM(){
  container.innerHTML= `${myLibrary.map((book) => `<ul id="${book.id}">
    <li><p>Title:${book.title}</p></li>
    <li><p>Author:${book.author}</p></li>
    <li><p>Pages:${book.pages}</p></li>
    <li><button>Update<button></li>
    <li><button>Delete<button></li>
    </ul>`).join('')}`
}

function addUpdateEventListener(){
  myLibrary.forEach((book)=>{
    const updateButtonNode=document.getElementById(book.id)
    updateButtonNode.addEventListener('click',(e)=>{
      const clickedButton= e.target.textContent;
      if(clickedButton=='Update'){
        show_data_card('update',e.currentTarget.id);
      }
      else{ //delete operation
        console.log(e.currentTarget.id)
        deleteBook(e.currentTarget.id)
      }   
    })
  })  
}

  const container=document.getElementById('books-container');
  const cardNode=document.querySelector('.data-card');
  const button = document.getElementById('new-book');
  const close = document.querySelector('.close')
  const submit = document.querySelector('.submit')

  button.addEventListener('click',()=>{show_data_card('open',null)})
  close.addEventListener('click',()=>{show_data_card('close',null)})
  submit.addEventListener('click',(e)=>{
    e.preventDefault()
    submit_data()
  })
  
  function submit_data(){
    if(gmsg=='open'){ // what button did user clicked on (update or + to add??)
      addBook()
    }
    else if(gmsg=='update'){
      updateBook()
    }
  }

  function show_data_card(msg,target){ // need target for to get book id for update
    const dup_update_flag = gmsg // Keep old msg , if old msg and new msg are both update then do not do nothing
    gmsg=msg
    
    const isVisible= cardNode.classList.contains('visible-data-card');
    const isHidden= cardNode.classList.contains('hidden-data-card');

    const flagCondition=cardNode.classList.contains('flag')
    const openCondition= gmsg==('open' || 'update') && isVisible;
    const closeCondition= gmsg=='close' && isHidden;
    const updateCondition= gmsg=='update';
    const prevUpdateCondition = dup_update_flag=='update'
    const updateDupCondition= !(prevUpdateCondition && updateCondition);

    if(!(openCondition || closeCondition)){

      if(flagCondition){
        replace(cardNode,{primary:'flag',replacement:'visible-data-card'})
      }
      else{
        if(updateDupCondition){// In case new/old msg is update
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



  
