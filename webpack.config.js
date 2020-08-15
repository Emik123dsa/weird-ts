require("@babel/polyfill");
require("@babel/plugin-syntax-class-properties");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require("webpack");
const path = require("path");

const isHMR = process.env.NODE_HMR === true;

const CopyWebpackPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const autoprefixer = require("autoprefixer");

const plugins = [
  new ProgressBarPlugin(),
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core/,
    path.resolve(__dirname, "src"),
    {}
  ),
  new CopyWebpackPlugin({
    patterns: [{ from: "src/assets/img", to: "img" }],
  }),
  new webpack.ProvidePlugin({
    fetch: "exports-loader?self.fetch!whatwg-fetch",
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.NamedModulesPlugin(),
];

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), "build"),
      publicPath: "/",
    },
    options.output
  ),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: path.resolve("tsconfig.json"),
            },
          },
          "angular2-template-loader",
        ],
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: loader => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('precss')(),
                require('autoprefixer')(),
              ],
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ]
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          "to-string-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: loader => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('precss')(),
                require('autoprefixer')(),
              ],
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2|png)$/,
        use: "file-loader",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(mp4|webm|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat(plugins),
  resolve: {
    alias: {
      "@@": path.resolve("src"),
    },
    modules: ["node_modules"],
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    mainFields: ["browser", "main", "jsnext:main"],
  },
  devtool: options.devtool,
  target: options.target,
  performance: options.performance || {},
  optimization: options.optimization || {},
});
