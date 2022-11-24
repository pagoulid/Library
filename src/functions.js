
export function replace(node,classNames){
    //cardNode.classList.replace('visible-data-card','hidden-data-card');
    node.classList.replace(classNames.primary,classNames.replacement)
  }
export function toggle(node,classArray){
    classArray.forEach(className => {
      node.classList.toggle(className);
    });
  }
  
export function getVal(str){
    if(str.includes(":")){
      str=str.split(":")
      str=str[1]
    }
    
    return str
  }

export function clearText(Nodes){
    Nodes.forEach(node => {
      node.value=''
    });
  }