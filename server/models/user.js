const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    books: [
        {
            description: {type: String },
            author: {type: String },
            image: {type: String },
            preview: {type: String },
            publisher: {type: String },
            date: {type: String },
            title: {type: String },
            pages: {type: String },
            haveRead: { type: Boolean },
            recommended: { type: Boolean }
        }
    ]
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);
