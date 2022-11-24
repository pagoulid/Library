import _ from 'lodash';
import './style.css';

let myLibrary=[]

let updateTarget=''
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
  button.addEventListener('click',()=>{show_data_card('open',null)})
  close.addEventListener('click',()=>{show_data_card('close',null)})
  submit.addEventListener('click',(e)=>{
    e.preventDefault()
    submit_data()
  })
  

  

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
        replace({primary:'flag',replacement:'visible-data-card'})
      }
      else{
        
        if(updateDupCondition){// In case new/old msg is update
          toggle(['hidden-data-card','visible-data-card'])
        }
        
        if(updateCondition){
          //console.log('CHECK!')
            const listNodes=document.getElementById(target).childNodes//[text,li,text,...] , text is useless , for line break
            let entryTitle=listNodes[1].childNodes[0].textContent
            let entryAuthor=listNodes[3].childNodes[0].textContent
            let entryPages=listNodes[5].childNodes[0].textContent
            
            entryTitle= getVal(entryTitle)
            entryAuthor= getVal(entryAuthor)
            entryPages=getVal(entryPages)

            const Nodes = get_data_card_nodes()
            set_data_card_nodes(Nodes,[entryTitle,entryAuthor,entryPages]) // to display entry values on data card inputs
            updateTarget=target // store target to global variable to use it when handling update submission
            

          }
          
        }
        
      }
    } 

  
  function get_data_card_nodes(){
    const titleNode=document.getElementById('book-title');
    const authorNode=document.getElementById('book-author');
    const pagesNode=document.getElementById('book-pages');
    return [titleNode,authorNode,pagesNode]
  }

  function set_data_card_nodes(nodes,values){

    nodes.forEach((node,index)=>{
      node.value=values[index]
    })
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

    const title=Nodes[0].value;
    const author=Nodes[1].value;
    const pages= Nodes[2].value;

   count=count+1 

   addBookToLibrary(count,title,author,pages);
   displayToDOM();
   addUpdateEventListener();
   clearText(Nodes);
    
  }
  
  function updateBook(){
    
    replace({primary:'visible-data-card',replacement:'hidden-data-card'})
    //console.log('OLA POPA')
      const listNodes=document.getElementById(updateTarget).childNodes//[text,li,text,...] , text is useless , for line break
      

    const Nodes= get_data_card_nodes() //[titleNode,authorNode,pagesNode]

    const title=Nodes[0].value;
    const author=Nodes[1].value;
    const pages= Nodes[2].value;

    listNodes[1].childNodes[0].textContent=title;
    listNodes[3].childNodes[0].textContent=author;
    listNodes[5].childNodes[0].textContent=pages;

    clearText(Nodes);

    gmsg='' // To avoid duplicate update check on next onclick for update


  }

  function addBookToLibrary(id,title,author,pages){
    const newBook =Book(id,title,author,pages);
    myLibrary.push(newBook);
    
  }

  function displayToDOM(){
    container.innerHTML= `${myLibrary.map((book) => `<ul id="${book.id}">
      <li><p>Title:${book.title}</p></li>
      <li><p>Author:${book.author}</p></li>
      <li><p>Pages:${book.pages}</p></li>
      <li><button>Update<button></li>
      </ul>`).join('')}`

  }

  function addUpdateEventListener(){
    myLibrary.forEach((book)=>{
      const updateButtonNode=document.getElementById(book.id)
      updateButtonNode.addEventListener('click',(e)=>{
        console.log('update message!:)')
        
        show_data_card('update',e.currentTarget.id);
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
  
  function getVal(str){
    if(str.includes(":")){
      str=str.split(":")
      str=str[1]
    }
    
    return str
  }
  //document.body.appendChild(main()).appendChild(component());