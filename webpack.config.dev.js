const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './app/index'
    ],
    output: {
        path: path.join(__dirname, '/app/public/build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
          'sinon': 'sinon/pkg/sinon'
        }
    },
    module: {
        // don't run babel-loader through the sinon module
        noParse: [/node_modules\/sinon\//],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel']
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'url-loader?limit=9999999'
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
            }, {
                test: /\.css$/,
                loader: 'style!css!postcss'
            }
        ]
    },
    // required for enzyme to work properly
    externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
    },
    postcss: function() {
        return [
            autoprefixer({ browsers: ['last 2 versions'] }),
        ];
    }
};
