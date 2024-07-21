const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      inject: true,
      favicon: path.join(__dirname, "public", "favicon.ico"),
    }),
    new CopyPlugin({
      patterns: [{ 
          from: path.join(__dirname, "public"), 
          to: path.join(__dirname, "dist"), 
          filter: (resourcePath) => { return !resourcePath.includes("index.html") } 
        }]
    }),
    new ModuleFederationPlugin({
      name: 'main_frontend',
      filename: 'remoteEntry.js',
      remotes: {
        'auth_app': 'auth_app@http://localhost:3001/remoteEntry.js',
        'popup_app': 'popup_app@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        'react-router-dom': {
          singleton: true,
        },
        'redux': {
          singleton: true
        },
        'react-redux': {
          singleton: true
        }
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        
   use: ["style-loader", "css-loader"],   },
      {
        test: /\.(png|jpe?g|gif|eot|woff2|woff|ttf|svg)$/i,    
        type: 'asset/resource'
      }
    ],
  }

};