import _ from 'lodash';
import './style.css';

function component() {
    const element = document.createElement('div');
    //const body = document.getElementsByTagName('body');
    //body.style.backgroundColor = 'blue'
 
   
   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
 
    return element;
  }

  document.body.appendChild(component());