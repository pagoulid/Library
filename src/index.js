import _ from 'lodash';
import './style.css';

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
  const button = document.getElementById('new-book');
  const close = document.querySelector('.close')
  button.addEventListener('click',()=>{show_data_card('open')})
  close.addEventListener('click',()=>{show_data_card('close')})

  function show_data_card(msg){
    const cardNode=document.querySelector('.data-card');
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
  
  //document.body.appendChild(main()).appendChild(component());