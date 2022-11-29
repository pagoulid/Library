import _ from 'lodash';
import {replace,toggle,clearText} from './functions.js'
import {get_data_card_nodes,set_data_card_nodes,get_entry_data} from './data.js'
import './style.css';
/* GLOBALS */ 
let updateTarget='' // store target which is going to be updated
let gmsg=''  // store msg for submission card (open/close/update)
let count=0  //count books
/* GLOBALS */
const fetchData=async function(){ 
            const URL = 'https://pagoulid.github.io/Library/data.json';
            const request = new Request(URL);
            let data = await fetch(request);
            data = await data.json()
            console.log(data)
            return data
        }
/*LIBRARY*/
const Library=require('./Library'); 
let myLibrary=new Library()
let data = fetchData()

/*LIBRARY*/
/*BOOK*/ 
const Book=require('./Book')
/*BOOK*/
//if(data.length>0){
  for(el in data){
    console.log(el.title)
    let storedBook=new Book(el.id,el.title,el.author,el.pages);
    console.log(storedBook.author)
    //myLibrary.addBookToLibrary(storedBook)
    }
  //myLibrary.displayToDOM();
  //myLibrary.addEntriesEventListener(BookEventCase);
  //count=myLibrary.books.length;
//}
/*VALIDATION FUNCTIONS*/
const validations=require('./validation');
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

      myLibrary.addBookToLibrary(newBook)
      console.log('Add to library:',myLibrary.books)
      myLibrary.displayToDOM(container);
      myLibrary.addEntriesEventListener(BookEventCase);

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
  myLibrary.deleteBookFromLibrary(id,count);
  count=count-1
  myLibrary.reArrangeBooks(count)
  console.log('Library after deletion:',myLibrary.books)
  myLibrary.displayToDOM(container);
  myLibrary.addEntriesEventListener(BookEventCase);
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

      myLibrary.updateBookFromLibrary(updateTarget-1,title,author,pages)
      console.log('Library after update:',myLibrary.books) 
      myLibrary.displayToDOM(container);
      myLibrary.addEntriesEventListener(BookEventCase);

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


/*EVENT LISTENERS*/
button.addEventListener('click',()=>{show_data_card('open',null)})
close.addEventListener('click',()=>{show_data_card('close',null)})
submit.addEventListener('click',(e)=>{
  e.preventDefault()
  submit_data()
})
/*EVENT LISTENERS*/
export function BookEventCase(event){

  const clickedButton= event.target.textContent; // target is the button user clicked
  if(clickedButton.includes('Update')){
    show_data_card('update',event.currentTarget.id);
  }
  else{ 
    deleteBook(event.currentTarget.id) // currentTarget is the card user clicked on
  }

}
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


  
