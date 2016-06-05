import express from 'express';
import User from '../models/user';
let router = express.Router();

router.post('/', (req,res) => {
    const email = req.body.email;
    User.findOne({ email }, (err,user) => {
        if (err) throw err;
        // If user doesn't exist, create one
        if (!user) {
            const newUser = new User({
                email: email
            });
            newUser.save((error) => {
                if (error) {
                    return res.status(404).json({Error: "Error has occured"});
                }
            })
            return res.status(201).json({ Message: "User created", books: newUser.books });
        }
        return res.status(201).json({ Message: "User Authenticated", books: user.books });
    })
});

//add book
router.post('/books', (req,res) => {
    const email = req.body.email;
    const book = req.body.book;
    // Find user and add book
    User.findOne({ email: email }, (err,user) => {
        if (err) return res.status(404).json({Error: "Error has occured"});
        if (!user) return res.status(404).json({Error: "User does not exist"});
        // check if book exist
        let bookIdx = user.books.findIndex((val) => {
            return (val.title === book.title) && (val.author === book.author)
        });
        if (bookIdx < 0) { // if doesn't exist, add it
            user.books.push(book)
        } else {
            user.books.splice(bookIdx,1,book) // else replace it
        }
        user.save()
        res.status(201).json({ Message: 'Book Added' });
    })
})

router.delete('/books/:id/:email', (req,res) => {
    const id = req.params.id;
    const email = req.params.email;
    User.findOne({ email: email }, (err,user) => {
        if (err) return res.status(404).json({Error: 'Error has occured'});
        if (!user) return res.status(404).json({Error: 'User does not exist'});

        let bookIdx = user.books.findIndex((val) => {
            return val._id.toString() === id.toString();
        });

        user.books.splice(bookIdx,1)

        user.save()
        res.status(201).json({Message: 'Book Deleted', books: user.books })
    })
});

router.post('/me', (req,res) => {
    const email = req.body.email;
    User.findOne({ email: email }, (err,user) => {
        if (err) return res.status(404).json({ Error: "Error has occured" });
        if (!user) return res.status(404).json({ Error: "Wrong user email" });
        return res.status(201).json({ Message: "User Authenticated", books: user.books });
    })
})



export default router;
