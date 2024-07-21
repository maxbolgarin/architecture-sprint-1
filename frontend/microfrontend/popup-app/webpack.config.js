const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3002,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'popup_app',
      filename: 'remoteEntry.js',
      exposes: {
        './PopupWithForm': './src/PopupWithForm.js',
        './AddPlacePopup': './src/AddPlacePopup.js',
        './EditAvatarPopup': './src/EditAvatarPopup.js',
        './EditProfilePopup': './src/EditProfilePopup.js',
        './ImagePopup': './src/ImagePopup.js',
      },
      shared: {
        react: {
          singleton: true
        },
        'react-dom': {
          singleton: true
        },
        'react-router-dom': {
          singleton: true
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
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.(png|jpe?g|gif|eot|woff2|woff|ttf|svg)$/i,    
      //   type: 'asset/resource'
      // }
    ],
  }

};