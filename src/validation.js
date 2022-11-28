function validTitle(title){
    return  Boolean(title?.match(/^[A-Za-z0-9"\s]*$/));
}
function validAuthor(author){
    return  Boolean(author?.match(/^[A-Za-z\s]*$/));
}
function validPages(pages){
    return Boolean(pages?.match(/^[0-9]*$/));
}

module.exports=[validTitle,validAuthor,validPages];