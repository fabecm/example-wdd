const packageJSON = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

const PATHS = {
    build: path.join(__dirname, 'target', 'angular-resources')
};

const srcDirPath = path.join(__dirname, 'app');

let envHashFileName = 'dev_[hash]';
let assetFileName = '[name].' + envHashFileName;

// const BUILD = process.env.MODE === 'build';
// const BUILD_ENV = argv.env;

module.exports = function(env) {
    if (!env) {
        env = {
            mode: 'watch'
        };
    }
    const BUILD = env.mode === 'build';
    var config = {
        resolve: {
            modules: [
                srcDirPath,
                path.join(__dirname, 'bower_components'),
                path.join(__dirname, 'node_modules')
            ]
        },
        devtool: 'inline-source-map',
        entry: {
            wdd: './app/app.js'
        },

        output: {
            path: PATHS.build,
            filename: BUILD ? 'js/' + assetFileName + '.js' : '[name].bundle.js',
            chunkFilename: BUILD ? 'js/chunks/' + assetFileName + '.js' : '[name].bundle.js'
        },
        module: {
            rules: [{
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/'
                    }
                }]
            }, {
                test: /\.(ttf|eot|svg|woff|woff2)($|\?)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/'
                    }
                }]
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['angularjs-annotate', 'transform-class-properties']
                    }
                }, {
                    loader: 'eslint-loader'
                }]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })

            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }, {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(srcDirPath, 'index.html'),
                filename: 'index.html',
                inject: 'body'
            }),
            new ExtractTextPlugin('style.css'),
            new CleanWebpackPlugin([PATHS.build], { verbose: false })
        ]
    };

    return config;
};