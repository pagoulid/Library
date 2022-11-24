import _ from 'lodash';
import './style.css';

let myLibrary=[]
let update=[]
let gmsg=''
let count=0 

function Book(id,title,author,pages){
  return {id,title,author,pages}
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
    submit_data()
  })
  

  

  function show_data_card(msg){
    gmsg=msg
    const isVisible= cardNode.classList.contains('visible-data-card');
    const isHidden= cardNode.classList.contains('hidden-data-card');

    const flagCondition=cardNode.classList.contains('flag')
    const openCondition= gmsg==('open' || 'update') && isVisible;
    const closeCondition= gmsg=='close' && isHidden;
    if(!(openCondition || closeCondition)){

      if(flagCondition){
        //cardNode.classList.replace('flag','visible-data-card');
        replace({primary:'flag',replacement:'visible-data-card'})
      }
      else{
        //cardNode.classList.toggle('hidden-data-card');
        //cardNode.classList.toggle('visible-data-card');
        toggle(['hidden-data-card','visible-data-card'])
        
      }
    } 

  }
  function get_data_card_nodes(){
    const titleNode=document.getElementById('book-title');
    const authorNode=document.getElementById('book-author');
    const pagesNode=document.getElementById('book-pages');
    return [titleNode,authorNode,pagesNode]
  }
  

  function submit_data(){

    if(gmsg=='open'){ // what button did user clicked on (update or + to add??)
      addBook()
    }
    else if(gmsg=='update'){
      updateBook()
    }
  }

  function addBook(){

    
    //close_data_card()
    replace({primary:'visible-data-card',replacement:'hidden-data-card'})

    /*const titleNode=document.getElementById('book-title');
    const authorNode=document.getElementById('book-author');
    const pagesNode=document.getElementById('book-pages');*/
    const Nodes= get_data_card_nodes() //[titleNode,authorNode,pagesNode]

    const title=Nodes[0].value//titleNode.value;
    const author=Nodes[1].value //authorNode.value;
    const pages= Nodes[2].value//pagesNode.value;

   count=count+1 

   addBookToLibrary(count,title,author,pages);
   displayToDOM();
   addUpdateEventListener();
   clearText(Nodes);
    
  }
  
  function updateBook(){
    
    replace({primary:'visible-data-card',replacement:'hidden-data-card'})
    console.log('OLA POPA')
  }

  function addBookToLibrary(id,title,author,pages){
    const newBook =Book(id,title,author,pages);
    myLibrary.push(newBook);
    
  }

  function displayToDOM(){
    container.innerHTML= `${myLibrary.map((book) => `<ul>
      <li><p>Title:${book.title}</p></li>
      <li><p>Author:${book.author}</p></li>
      <li><p>Pages:${book.pages}</p></li>
      <li><button id="${book.id}" >Update<button></li>
      </ul>`).join('')}`

  }

  function addUpdateEventListener(){
    myLibrary.forEach((book)=>{
      const updateButtonNode=document.getElementById(book.id)
      updateButtonNode.addEventListener('click',()=>{
        console.log('update message!:)')
        show_data_card('update');
      })
    })
    

      
}

  function clearText(Nodes){
    Nodes.forEach(node => {
      node.value=''
    });
  }
  function replace(classNames){
    //cardNode.classList.replace('visible-data-card','hidden-data-card');
    cardNode.classList.replace(classNames.primary,classNames.replacement)
  }
  function toggle(classArray){
    classArray.forEach(className => {
      cardNode.classList.toggle(className);
    });
  }
  
  //document.body.appendChild(main()).appendChild(component());