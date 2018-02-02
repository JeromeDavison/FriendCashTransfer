var express = require('express');
var cors = require('cors');
var app = express();
var cors = require('cors');
var stripe = require('stripe')('sk_test_BSlr33uONOToM2gHIEPa8LVo');
var passport = require('passport');
var Users = require('./userSchem');
var mongoose = require('mongoose');
var body = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
app.use(body.urlencoded({extended: true}));
app.use(require('express-session')({
	secret:'4t8j43g43g9ijei59jiejgeg49u',
	resave:false,
	saveUnitialized: false
}));

app.use(cors())
// use static authenticate method of model in LocalStrategy
passport.use(Users.User.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(Users.User.serializeUser());
passport.deserializeUser(Users.User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use('/static', express.static('static'));
mongoose.connect('mongodb://127.0.0.1/FinalTest');
// Logged in verify




var CHAR_SETS = {
    d: '0123456789',
    A: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    w: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
};

function mapString(s, func) {
    return Array.prototype.map.call(s, func).join('')
}

function randChar(charType) {
    var chars = CHAR_SETS[charType];
    if (chars) {
        return chars.charAt(parseInt(Math.random() * chars.length));
    } else {
        return charType;
    }
}

function loggedin(req,res,next) {
	if(req.isAuthenticated()) {
		next();
	}
	else {
		res.send('please go back and log in, Thank you!');
	}
	};


// login 
app.route('/Login')
.get((req, res, next) => {
res.sendFile(__dirname + '/PaymentScreen.html');
})
.post(passport.authenticate('local'), function(req,res, next){
	
	 res.redirect('/home');
})
// register
  app.route('/Register')
.post((req,res, next) => {
	Users.User.register({username:req.body.username}, req.body.password, function(err, result){
		if (err){
			console.log('user was not registered');
			//redirect to json with to state ^
		} else {
	passport.authenticate('local')(req, res, function (){
	
	var newDb;
	newDb = Users.Pay();
	newDb.username = req.body.username;

	stripe.customers.create({
	description:'Thank you for signing up with us ' + req.body.username,
    source: 'tok_visa'
    }, function(err, customer){
	if (err){
		res.json({info:'sorry, your credit card info may be incorrect please be wrong please resubmit thank you'});
	} else {
	//create bank account
     stripe.accounts.create({
	type:'custom',
	country:'US',
	email:req.body.email
}).then(function(acct){
	 stripe.tokens.create({
	 bank_account : {
	 country:'US',
	 currency:'usd',
	 account_holder_name: req.body.username,
	 account_holder_type: req.body.type,
	 routing_number: req.body.routing,
	 account_number: req.body.account
	 }
 }, function (error, token){
		 if (error){
			 console.log('it didnt work', error);
			 res.json({info:'sorry, please re-check your bank details thank you'})
			 // send json to confirm error 
		 } else {
		 stripe.customers.createSource(
		 customer.id,
		 {source:token.id
		 },
		function (error2, card){
			if (error2)
			{
				console.log('another faild');
				res.json({info:'sorry, your card info may be incorrect, please resubmit.'});
				//send json to confirm error 
		} else {
			newDb.bankInfo = acct.id;
			newDb.save(function(err,resp){
		    
		    
	      })
			newDb.save(function(err,resp){
		stripe.accounts.createExternalAccount(acct.id,
	 {
     external_account: {
	 object: 'bank_account',
	 country:'US',
	 currency:'usd',
	 account_holder_name: req.body.username,
	 account_holder_type: req.body.type,
	 routing_number: req.body.routing,
	 account_number: req.body.account
	 }}).then(function(data){
	           res.redirect('/home');
	           })   
	          })
		     }
            }
           )	
          }	 
         }
        )
      });	 
     };
    })
   })
  }
 })		
})

//create bank account connection

app.route('/homePage')
.get( function (req, res, next){
	Users.Transfer.find({toUsername: req.user.username, confirmed: true}, function (err, data){
	if (err)
	{
	res.json({data:'sorry, your information was not retrieved, please try again or contact supporrt'});
	} else {
	res.json({data:data});
	}
 });	
});

app.route('/unaccept')
.get( function (req, res, next){
	Users.Transfer.find({toUsername: req.user.username, confirmed: false}, function (err, data){
	if (err)
	{
	res.json({data:'sorry, your information was not retrieved, please try again or contact supporrt'});
	} else {
	res.json({data:data});
	}
 });	
});


//set up charge to another account 
app.route('/requestUser')
.get(function(req,res,next){
	res.json({data:req.user.username});
	
})
app.route('/acceptTransfer')
.post(function(req,res,next){
	Users.Transfer.find({invoiceId:req.body.ID}, function(err, succ){
		if (err){
			res.json({data:'sorry, incorrect ID, try again'});
		} else {
			succ[0].confirmed = true;
			succ[0].save(function(error, saved){
				if (error){
				res.json({data:'sorry, incorrect ID, try again'});
				} else {
					res.json({data:saved});

					
				}
				
				
			});

			
			
		}
		
		
	});
	
})





app.route('/Transfer')
.post( function (req,res,next) {
	Users.Transfer.find({invoiceId:req.body.ID, confirmed: true}, function(failedID, IDverify){
		if(failedID) {
		res.json({data:'sorry, ID is incorrect. Please try again'})

		} else {
	Users.Pay.find({username: req.user.username}, function(err, info){
	Users.Pay.find({username: IDverify[0].toUsername}, function(error, ToUser){
	//open db and grab account id
	if(error){
		res.json({Data:'sorry, the user you entered doesnt exist!'});
	} else{
	
    stripe.accounts.retrieve(
     info.bankInfo,
	function(err, account){
		if (err){
		res.json({
         data:'sorry, there was an error please try again'
		})		
			
		} else {
		console.log(info, ToUser);
		stripe.charges.create({
          amount:req.body.much,
		  currency:'usd',
		  source:'tok_visa',
		  destination: {
			  amount:req.body.much,
			  account:ToUser[0].bankInfo
			  
		  }
		}).then(function(charge){
			// open db and save charge data along with the user who sent
			let newPay = IDverify[0].howMuch - req.body.much;
			
			IDverify[0].howMuch = newPay; 
			if (IDverify[0].howMuch <= 0){
				IDverify[0].remove(function(here, gone){
					if (here){
						res.json({data:'sorry, your deletion failed!'});
					} else{
						res.json({data:'sorry, your deletion failed!'});

						
					}
					
				})
				
			} else {
			IDverify[0].save(function (err, win){
				if (win){
           	console.log(charge, win);			
            res.redirect('/BankInfo');
				}
			})
		}
		 });			
		}
	  }
	 );
	}
			
	});
  })
	}
});
})
	
app.route('/createTransfer')
.post((req, res, next) => {
	//let them input invoiceID
	var newTransfer = new Users.Transfer();
	let ID = mapString('Add-wwww-AAA-ddA', randChar);
	newTransfer.toUsername = req.user.username;
	newTransfer.fromUsername = req.body.username;
	newTransfer.ForItem = req.body.ForItem;
	newTransfer.howMuch = req.body.howMuch;
	newTransfer.invoiceId = ID; //transferCode
	newTransfer.save(function (err, data){
		if (err){
		res.json({data: 'You have no invoices to accept!'});
	} else {
	res.json({data:data});
	
	}
})
})







app.route('/PastCharges')
.get((req, res, next) => {
	// retrieve the charge list, parse info i need, send back to user
	Users.payEstablish({toUsername:req.user.username}, function (err, data){ //open db
	if (err){
		res.json({info:'sorry, couldnt retrieve past charges'});	
	}
	//send info back in json pieces
	res.json({info:data})
 })	
})


app.route('/AccountData')
.get((req,res,next) => {
	//each username is associated with an automatically generated account which is made on the registration
stripe.accounts.retrieve(
    req.body.AcctInfo, // linked to user
	function(err, account){
		res.json({
        BankInfo:account
		});		//send as json data
		//on click allow access to update AccountData
	}
	);
});	





app.route('/homePa') // <!-- home page info -->
.get((req,res,next) => {
	//each username is associated with an automatically generated account which is made on the registration
	Users.Transfer.find({toUserrname: req.user.username}, function(err, info){
     res.json({data:info});
	})
});



app.route('/ChangeBankInfo')
.post((req,res,next) => {
	//each username is associated with an automatically generated account which is made on the registration
	    res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Credentials", "true"); res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"); res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"); next();
		stripe.accounts.deleteExternalAccount(
		req.body.AcctInfo,
		req.body.BankInfo).then(function (data){
	 stripe.accounts.createExternalAccount(
	 req.body.AcctInfo, {
     external_account: {
	 object: 'bank_account',
	 country:'US',
	 currency:'usd',
	 account_holder_name: req.user.username,
	 account_holder_type: 'individual',
	 routing_number: req.body.routing,
	 account_number: req.body.account
	 }}).then(function(info){
		console.log(info) 
		 
	 }).catch(function (infoErr){
		 console.log(infoErr)
	 }).catch(function(err){
			res.json({data:'sorry, your information failed to be changed, please try again'})
			
			
		})
		
		
		
		
		
	
})
})	



	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 




    














app.route('/:id')
.get(loggedin, (req, res, next) => {
	// front end is going to send post request with userID
	   res.sendFile(__dirname + '/PaymentScreen.html');
})
.post(loggedin, function(req,res, next){
	
})

app.route('/Payment')
.post(loggedin, (req,res, next) => {
	
	
	// use api here
	
	
	
	//need database holding 
	
	
	
	//send list of all Payment dues
	
	

})









	
	


app.listen(3000, function (req, res){
	
	console.log('listening sir!');
})
