import { getVal } from "./functions";
export function get_data_card_nodes(){ // retrieve input nodes from submit card
    const titleNode=document.getElementById('book-title');
    const authorNode=document.getElementById('book-author');
    const pagesNode=document.getElementById('book-pages');
    const selectorNode=document.getElementById('book-status');
    
    return [titleNode,authorNode,pagesNode,selectorNode]
  }

export function set_data_card_nodes(nodes,values){ //set values to input nodes of submit card (display to DOM)
    //let input_statusNode=nodes[3];
    //let value_status=values[3].trim();
    //nodes.splice(3,1); // separate status input and value fron book card
    //values.splice(3,1);
    nodes.forEach((node,index)=>{
        node.value=values[index]
    })
    //console.log('Status before update:',value_status)
    
    /*if(value_status=='unfinished'){
     document.getElementById("book-status").selectedIndex=0
    }
    else{
      document.getElementById("book-status").selectedIndex=1
    } */
  }
  

export function get_entry_data(id){//get values from a targeted book card
  const listNodes=document.getElementById(id).childNodes//[text,li,text,...] , text is useless , for line break
  let entryTitle=listNodes[1].childNodes[0].textContent
  let entryAuthor=listNodes[3].childNodes[0].textContent
  let entryPages=listNodes[5].childNodes[0].textContent
  let entryStatus=listNodes[7].childNodes[0].textContent
  
  entryTitle= getVal(entryTitle)
  entryAuthor= getVal(entryAuthor)
  entryPages=getVal(entryPages)
  entryStatus=getVal(entryStatus)

  return [entryTitle,entryAuthor,entryPages,entryStatus]

}