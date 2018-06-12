
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.ts']
  },
  entry: './js/ng2/app/main.jit.ts',
  output: {
    path: path.resolve(__dirname, '.build/jit'),
    filename: 'app.main.js'
  },
  optimization: {
      minimizer: [
          new UglifyJsPlugin({
              cache: true,
              parallel: true,
              uglifyOptions: {
                  compress: false,
                  ecma: 6,
                  mangle: true
              },
              sourceMap: true
          })
      ]
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            'TYPE': JSON.stringify('JIT')
        }
    }),
    new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, './client')),
    new CopyWebpackPlugin([
        {
            from: './index.html', to: 'index.html'
        },
        {
            from: './node_modules/zone.js/dist/zone.js',
            to: './node_modules/zone.js/dist/zone.js'
        }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.(ts|js)$/,
        loaders: [
            'angular-router-loader'
        ]
      }
    ]
  }
};

