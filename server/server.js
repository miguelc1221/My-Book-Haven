import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev.js';
import cors from 'cors';
import serverConfig from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import jwt from 'express-jwt';

const app = express();
const compiler = webpack(config);

const isProduction = process.env.NODE_ENV === 'production';

const authCheck = jwt({
    secret: new Buffer(serverConfig.authCheck, 'base64'),
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
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../app/public')));

//routes
import bookRoutes from './routes/books';
import userRoutes from './routes/user';

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
