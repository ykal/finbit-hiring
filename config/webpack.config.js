const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths.js");

module.exports = {
  entry: path.join(paths.srcPath, "index.js"),
  output: { path: paths.outPath, filename: "bundle.js" },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(jpg|png|svg)$/, use: "file-loader" },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.srcPath, "index.html"),
    }),
  ],
};
