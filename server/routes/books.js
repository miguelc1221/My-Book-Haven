const express = require('express');
const books = require('google-books-search')
let router = express.Router();

router.post('/', (req,res) => {
    const book = req.body.book;

    books.search(`${book}`,{ limit: 21 }, (error, results) => {
        if (error || !results || results.length === 0) {
            return res.status(404).json({
                title: 'Error has occurred',
                error: error
            });
        }

        const resultsArr = results.slice(0,results.length);

        const booksArray = resultsArr.reduce((acc,val) => {
            var obj = {};
            obj.description = val.description;
            obj.author = val.authors[0];
            obj.image = val.thumbnail;
            obj.preview = val.link;
            obj.publisher = val.publisher;
            obj.date = val.publishedDate;
            obj.title = val.title;
            obj.pages = val.pageCount

            acc.push(obj)
            return acc;
        }, []);

        res.status(201).json(booksArray);
    });
});




module.exports = router;
