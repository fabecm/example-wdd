const packageJSON = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var apiMocker = require('connect-api-mocker');

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
            mode: 'watch',
            mock: false
        };
    }
    const MOCK = env.mock;
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
            // 'wdd.vendor': ['angular', 'jquery', 'moment', 'angular-ui-bootstrap', 'angular-sanitize', 'ng-csv', 'angular-resizable', 'file-saver']
        },

        output: {
            path: PATHS.build,
            filename: BUILD ? 'js/' + assetFileName + '.js' : '[name].bundle.js',
            chunkFilename: BUILD ? 'js/chunks/' + assetFileName + '.js' : '[name].bundle.js'
        },
        devServer: {
            port: 3002,
            historyApiFallback: true,
            contentBase: PATHS.build,
            allowedHosts: [
                '*'
            ],
            stats: {
                modules: true,
                cached: true,
                colors: true,
                chunk: true
            }
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
                test: /\.(xlsx)($|\?)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'public/'
                    }
                }]
                }, {
                    test: /\.(pdf)($|\?)/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'public/'
                        }
                    }]
                }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['angularjs-annotate', 'transform-class-properties', 'transform-object-assign']
                    }
                }, {
                    loader: 'eslint-loader'
                }]
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
            autoprefixer,
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'wdd.vendor',
            //     minChunks: Infinity
            // }),
            new HtmlWebpackPlugin({
                template: path.join(srcDirPath, 'index.html'),
                filename: 'index.html',
                inject: 'body'
            }),
            new ExtractTextPlugin('style.css'),
            new CleanWebpackPlugin([PATHS.build], { verbose: false }),
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                ui: {
                    port: 3001
                },
                proxy: 'http://localhost:3002/',
                // browser: ['google chrome'],
                open: false,
                ghostMode: false
            }, {
                reload: false
            })
        ]
    };

    if (MOCK) {
        config.devServer.setup = function (app) {
            app.use('/edd-uiAppl', apiMocker('app/mocks/'));
        };
    }

    if (BUILD) {
        //  if (BUILD && PROD) {
        config.plugins.push(
            new UglifyJsPlugin()
        );
    }

    if (BUILD) {
        config.module.rules.push({
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader'
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
                }, {
                    loader: 'postcss-loader'
                }]
            })
        });
    } else {
        config.module.rules.push({
            test: /\.scss$/,
            use: [{
                loader: 'style-loader',
                options: { sourceMap: true }
            }, {
                loader: 'css-loader',
                options: { sourceMap: true }
            }, {
                loader: 'postcss-loader',
                options: { sourceMap: true }
            }, {
                loader: 'sass-loader',
                options: { sourceMap: true }
            }]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        });
    }

    return config;
};
