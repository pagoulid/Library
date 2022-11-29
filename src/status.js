export function changeStatus(value,params){
    console.log('Selected status on submit: ',params[value])
    document.getElementById('book-status').selectedIndex=params[value]
}
export function resetStatus(){
    document.getElementById('book-status').selectedIndex=0
}
