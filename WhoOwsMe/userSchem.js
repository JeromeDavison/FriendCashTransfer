const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var UserData = new Schema({
	  username: String,
	  password: String
	
	
	
	
	
});

var Payment = new Schema({
	  username: String,
	  bankInfo:String,
	
	
})



  var payEstablish = new Schema ({
	invoiceID: String,
	toUsername: String,
	charge:{},
	fromUsername: String,
	ForItem: String,
});
 var Transfer = new Schema ({
	invoiceId: String,
	toUsername: String,
	fromUsername: String,
	ForItem: String,
    howMuch: Number,
	confirmed:{type:Boolean,
	default:false}
 })

UserData.plugin(passportLocalMongoose);
var Pay = mongoose.model('Pay', Payment);
var User = mongoose.model('User', UserData);
 var payEstablish = mongoose.model('payEstablish', payEstablish); 
var Transfer = mongoose.model('Transfer', Transfer);
 module.exports = {
	User:User,
	Pay:Pay,
	payEstablish:payEstablish,
    Transfer:Transfer	
}