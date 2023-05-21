const Book = require('../models/book')

const bookController = {
    getAll: function (req, res, next) {
        res.status(200).json(Book.getAll());
    },
    
    getById: function (req, res, next) {
        let book = Book.getById(req.params.id)
        if (book) {
            res.status(200).json(book);
        }
        else
            res.status(404).json ({message: `Could not find book with is ${req.params.id}`})
        
    },

    deleteById: function (req, res, next) {
        let book = Book.deletebyId(req.params.id)
        if (book) {
            res.status(200).json(book);
        }
        else
            res.status(404).json({ message: `Could not find book with is ${req.params.id}` })

    },

    save: function (req, res, next) {
        let book = new Book(req.body.id,req.body.title, req.body.isbn,req.body.publishedDate,req.body.author);
        book.save();
        res.json(book);
    },

    update: function (req, res, next) {
        if (req.body === null)
            res.status(204).json({ message: `No content of book supplied for  ${req.params.id}` })
        else {
            let book = Book.update(req.params.id, req.body.title, req.body.isbn, req.body.publishedDate, req.body.author);
            if (book) {
                res.status(200).json(book);
            }
            else
                res.status(404).json({ message: `Could not find book with is ${req.params.id}` })
        }
    }
} 

module.exports = bookController;