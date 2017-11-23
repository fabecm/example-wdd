var packageJSON = require('./package.json');
var path = require('path');
var webpack = require('webpack');

const PATHS = {
    build: path.join(__dirname, 'target', 'classes', 'META-INF', 'resources', 'webjars', packageJSON.name, packageJSON.version)
};

module.exports = {
    entry: './app/app.js',

    output: {
        path: PATHS.build,
        publicPath: '/assets/',
        filename: 'app-bundle.js'
    },
    module: {
        rules: [{
            test: /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/,
            use: [{
                loader: 'file-loader',
                options: {}
            }]
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['angularjs-annotate', 'transform-class-properties']
                }
            }
        }, {
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }, {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader'
            }
        }]
    }
};