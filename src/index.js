import _ from 'lodash';
import './style.css';

function component() {
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
  }
  
  document.body.appendChild(main()).appendChild(component());