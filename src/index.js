import _ from 'lodash';
import './style.css';

let myLibrary=[]

function Book(title,author,pages){
  return {title,author,pages}
}
/*function component() {
    const element = document.createElement('button');
    element.classList.add('button');
    //const element = document.getElementsByTagName('main');
    //body.style.backgroundColor = 'blue'
 
   
   // Lodash, now imported by this script
    element.innerHTML = _.join(['NEW BOOK'], ' ');
 
    return element;
  }
  function main(){
    const element = document.createElement('main');
    element.classList.add('main')
    return element;
  }*/
  
  const container=document.getElementById('books-container');
  const cardNode=document.querySelector('.data-card');
  const button = document.getElementById('new-book');
  const close = document.querySelector('.close')
  const submit = document.querySelector('.submit')
  button.addEventListener('click',()=>{show_data_card('open')})
  close.addEventListener('click',()=>{show_data_card('close')})
  submit.addEventListener('click',(e)=>{
    e.preventDefault()
    addBook()
  })
  

  

  function show_data_card(msg){
    
    const isVisible= cardNode.classList.contains('visible-data-card');
    const isHidden= cardNode.classList.contains('hidden-data-card');

    const flagCondition=cardNode.classList.contains('flag')
    const openCondition= msg=='open' && isVisible;
    const closeCondition= msg=='close' && isHidden;
    if(!(openCondition || closeCondition)){

      if(flagCondition){
        cardNode.classList.replace('flag','visible-data-card');
      }
      else{
        cardNode.classList.toggle('hidden-data-card');
        cardNode.classList.toggle('visible-data-card');
      }
    } 

  }

  function addBook(){

    
    cardNode.classList.replace('visible-data-card','hidden-data-card');
    
    const titleNode=document.getElementById('book-title');
    const authorNode=document.getElementById('book-author');
    const pagesNode=document.getElementById('book-pages');

    const title=titleNode.value;
    const author=authorNode.value;
    const pages=pagesNode.value;

   

    const newBook =Book(title,author,pages);
    myLibrary.push(newBook)
    console.log(myLibrary)
    if(myLibrary.length>0){

      container.innerHTML= `${myLibrary.map((book) => `<ul><li><p>Title:${book.title}</p><p>Author:${book.author}</p><p>Pages:${book.pages}</p></li></ul>`).join('')}`


    }
   
    titleNode.value=''
    authorNode.value=''
    pagesNode.value=''
  }
  
  
  //document.body.appendChild(main()).appendChild(component());