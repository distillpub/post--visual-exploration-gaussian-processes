const path = require('path');
const webpack = require('webpack');

const devMode = process.env.WEBPACK_SERVE;

module.exports = {
  entry: './src/main.js',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            dev: devMode ? true : false,
            store: true,
            hotReload: devMode ? true : false,
            hotOptions: {
              noPreserveState: true
            }
          }
        }
      },
      {
        enforce: 'pre',
        test: /\.(js|html)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc.json',
          emitWarning: devMode ? true : false
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  serve: {
    content: path.join(__dirname, 'public'),
    open: true
  },
  mode: devMode ? 'development' : 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(devMode ? 'development' : 'production')
    })
  ]
};
