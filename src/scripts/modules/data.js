import { getVal } from "./functions";
export function get_data_card_nodes(id_array){ // retrieve input nodes from submit card
    let nodes=[]
    id_array.forEach((id)=>{
      let node=document.getElementById(id);
      nodes.push(node)
    })
    
    return nodes//[titleNode,authorNode,pagesNode,selectorNode]
  }

export function set_data_card_nodes(nodes,values){ //set values to input nodes of submit card (display to DOM)
    nodes.forEach((node,index)=>{
        node.value=values[index]
    })
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