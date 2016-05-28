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
            return res.status(201).json(newUser);
        }

        res.status(201).json(user);
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

        user.books.push(book);
        user.save();
        return res.status(201).json(user)
    })
})

router.post('/me', (req,res) => {
    const email = req.body.email;
    User.findOne({ email: email }, (err,user) => {
        if (err) return res.status(404).json({ Error: "Error has occured" });
        if (!user) return res.status(404).json({ Error: "wrong user email" });
        return res.status(201).json(user);
    })
})



export default router;
