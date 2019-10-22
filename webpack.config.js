const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    stats: {
      children: false,
      maxModules: 0
    },
    port: 3001
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Titan',
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets',
        to: 'assets'
      }
    ])
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
