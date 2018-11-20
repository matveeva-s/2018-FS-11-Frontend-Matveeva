const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourceRoot = path.resolve(__dirname, 'src');

module.exports = {
  devServer: {
    contentBase: './dist',
  },
  entry: {
    create: `${sourceRoot}/app/create/index.js`,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: sourceRoot,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /shadow\.css$/,
        include: sourceRoot,
        use: {
          loader: 'css-loader',
        },
      },
      {
        test: /index\.css$/,
        include: sourceRoot,
        use: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
      },
      {
        test: /\.(svg|png|jpg)([\?]?.*)$/,
        loader: 'url-loader',
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name]/style.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'create/index.html',
      template: './src/app/create/index.html',
    }),
  ],
};
