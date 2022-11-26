export function validTitle(title){
    return  Boolean(title?.match(/^[A-Za-z0-9-"\s]*$/));
}
export function validAuthor(author){
    return  Boolean(author?.match(/^[A-Za-z\s]*$/));
}
export function validPages(pages){
    return Boolean(pages?.match(/^[0-9]*$/));
}