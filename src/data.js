import { getVal } from "./functions";
export function get_data_card_nodes(){
    const titleNode=document.getElementById('book-title');
    const authorNode=document.getElementById('book-author');
    const pagesNode=document.getElementById('book-pages');
    return [titleNode,authorNode,pagesNode]
  }

export function set_data_card_nodes(nodes,values){

    nodes.forEach((node,index)=>{
      node.value=values[index]
    })
  }

export function get_entry_data(id){
  const listNodes=document.getElementById(id).childNodes//[text,li,text,...] , text is useless , for line break
  let entryTitle=listNodes[1].childNodes[0].textContent
  let entryAuthor=listNodes[3].childNodes[0].textContent
  let entryPages=listNodes[5].childNodes[0].textContent
  
  entryTitle= getVal(entryTitle)
  entryAuthor= getVal(entryAuthor)
  entryPages=getVal(entryPages)

  return [entryTitle,entryAuthor,entryPages]

}