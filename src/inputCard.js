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