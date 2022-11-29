module.exports= class Book{
    constructor(id,title,author,pages,status){
        this.id=id
        this.title=title
        this.author=author
        this.pages=pages
        this.status=status

    }

    compareTitle(otherTitle){
        if(otherTitle==this.title){
          return true
        }
        return false
      }
      compareAuthor(otherAuthor){
        if(otherAuthor==this.author){
          return true
        }
        return false
      }
      comparePages(otherPages){
        if(otherPages==this.pages){
          return true
        }
        return false
      }
}