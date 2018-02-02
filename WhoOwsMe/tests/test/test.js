var expect = require('chai').assert;

var funcs = require('../data');
var test = new funcs;
var express = require('express');
var cors = require('cors');
var app = express();
var cors = require('cors');
var passport = require('passport');
var Users = require('./userSchem');
var mongoose = require('mongoose');
var body = require('body-parser');
var passportLocalMongoose = require('passport-local-mongoose');
app.use(body.urlencoded({extended: true}));
app.use(require('express-session')({
	secret:'4t8j43g43g9ijei59jiejgeg49u',
	resave:false,
	saveUnitialized: false
}));

app.use(cors())
// use static authenticate method of model in LocalStrategy
// use static serialize and deserialize of model for passport session support

app.use(cors());
mongoose.connect('mongodb://127.0.0.1/TestInfo');
describe('DbTest', function (){
	it ('should return a sucessful log and the name in the database', function(){
		var Name = Users();
		Name.title = 'Test complete';
		
		//save 
		Name.save(function( err, info){
			expect(info.title).to.equal('Test complete');
		})
		
		
	})
	
	
});
describe('DbTest', function (){
	it ('should return a sucessful log and the name in the database', function(){
		var Name = Users();
		Name.title = 'Test complete';
		
		//save 
		Name.save(function( err, info){
			expect(info.title).to.equal('Test complete');
		})
		
		
	})
	
	
});
