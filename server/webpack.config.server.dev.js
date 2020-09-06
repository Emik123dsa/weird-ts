const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.SourceMapDevToolPlugin({
        filename: 'main.js.map',
        exclude: ['bundle.js'],
    }),
    new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: false,
    }),
];

module.exports = require('./webpack.config.js')({
    mode: 'development',
    entry: {
        server: ['./src/boostrap.server.ts'],
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    plugins,
    target: 'node',
    devtool: 'eval-source-map',
    perfomance: {
        hints: false,
    },
});
