var path = require('path');
var webpack = require('webpack');

module.exports = {
 entry: {
	    home: './enter.js',
		register:'./register.js',
		Payscreen:'./components.js'
 },
 output: { path: __dirname, filename: './static/[name].js' },
 
 
 module: {
  loaders: [
   {
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: /node-modules/,
    query: {
     presets: ['es2015', 'react', 'stage-2']

    }
   },
   {
	   test:/\.css$/,
	   loader: 'style-loader'
   },
   {
	 test: /\.css$/,
     loader: 'css-loader',
     query: {
     modules: true,
	 localIdentName: '[name]__[local]___[hash:base64:5]'
     }	 
	   
   }
  ]
 },
};﻿
