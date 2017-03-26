const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.dev.js');
const serverConfig = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('express-jwt');

const app = express();
const compiler = webpack(config);

const isProduction = process.env.NODE_ENV === 'production';

const authCheck = jwt({
    secret: new Buffer(serverConfig.authCheck || 'haha', 'base64'),
    audience: 'BjlDBoIyhcstbiblQiyiV3g1vd8xffhR'
});

// DB Setup
mongoose.connect(serverConfig.db)

// Webpack-dev-middleware
if (!isProduction) {
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../app/public')));

//route
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

app.use('/books', authCheck, bookRoutes);
app.use('/user', authCheck, userRoutes);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/../app/public/index.html'));
});

//server
app.listen(serverConfig.port, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost: ' + serverConfig.port);
});
