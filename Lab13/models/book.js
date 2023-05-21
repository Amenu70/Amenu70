let books = [];
class Book{
    constructor(id,title, isbn, publishedDate, author) {
        this.id =id;
        this.title = title;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.author = author;
    }

    save() {
        books.push(this);
    }

    static deletebyId(id) {
        let book = books.find(b => b.id == id);
        if (book) {
            books.splice(books.indexOf(book), 1);
        }
        return book;
    }
    static getById(id) {
        return books.find(b => b.id == id);
    }
    static getAll() {
        return books;
    }
    static update(id,title,isbn,publishedDate,author) {
        let index = books.findIndex(b => b.id == id);
        if (index>-1) {
            books[index].title = title
            books[index].isbn = isbn
            books[index].publishedDate = publishedDate
            books[index].author=author
        }
        return books[index];
    }

}

module.exports = Book;