const { AngularCompilerPlugin } = require('@ngtools/webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var appModule = __dirname + '/js/ng2/app/app.module#AppModule';
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './js/ng2/app/main.aot.ts',
  output: {
    path: path.resolve(__dirname, '.build/aot'),
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
            'TYPE': JSON.stringify('AOT')
        }
    }),
    new AngularCompilerPlugin({
      tsConfigPath: './tsconfig-aot.json',
      entryModule: appModule
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
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
      {test: /\.scss$/, use: ['raw-loader', 'sass-loader']},
      {test: /\.css$/, use: 'raw-loader'},
      {test: /\.html$/, use: 'raw-loader'},
      {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack'
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};

