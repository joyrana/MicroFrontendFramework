'use strict';

const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');


var isProduction = false;
var isServeMode = false;
if (process.argv.indexOf('--production') > -1) {
    isProduction = true;
}
if (process.argv.indexOf('serve') > -1) {
    isServeMode = true;
}

var config = {
    entry: {
        polyfill: [
            __dirname + '/src/polyfill.ts'
        ],
        core: [
            __dirname + '/src/index.ts'
        ],
        apps: [
            __dirname + '/src/apps.ts'
        ]
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    externals: {},
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'mff.[name].js',
        path: path.resolve(__dirname, 'dist/1.0.0')
    },
    plugins: [
        new TSLintPlugin({
            files: ['./src/**/*.ts']
        })
    ],
    optimization: {
        splitChunks: {
        }
    }
  
};
if (isProduction) {
    console.log(chalk.yellow("Webpack: Building production code"));
    config.mode = 'production';
    config.optimization = {
        minimizer: [new UglifyJsPlugin()],
    };
} else if (isServeMode) {
    console.log(chalk.yellow("Webpack: Building development code"));
    config.watch =true;
    config.watchOptions = {
        poll: 1000 // Check for changes every second
    };
    config.mode = 'development';
} else {
    console.log(chalk.yellow("Webpack: Building development code"));
    config.mode = 'development';
}

module.exports = config;