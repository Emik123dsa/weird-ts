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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        template: 'static/index.html',
        filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: false,
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
];

module.exports = require('./webpack.config.js')({
    mode: 'development',
    entry: {
        polyfills: ['./src/polyfills.ts'],
        'vendor.style': ['./src/assets/styles/main.sass'],
        server: ['./src/bootstrap.ts', 'webpack-hot-middleware/client'],
    },
    output: {
        filename: '[name].[hash:64].dev.js',
        chunkFilename: '[name].[hash:64].dev.js',
    },
    plugins,
    target: 'node',
    devtool: 'eval-source-map',
    perfomance: {
        hints: false,
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
});
