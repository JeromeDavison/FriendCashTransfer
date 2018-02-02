import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import style from './static/style.css';

"use strict";
/*figure out way to request some data from serv to prop */











 class Container extends React.Component {
	constructor(prop){
		super(prop);
		this.state = {username:'',
		              password:'',
					  formData:'Login',
					  postData:'/Login',
										  
				}
		this.handleChange = this.handleChange.bind(this);
		this.Login = this.Login.bind(this);
		this.Register = this.Register.bind(this);
	}
    
   // Deal with server data keep reference for later on

	
	// Register vs Login option 
	handleChange(e){
		e.preventDefault();
		if (this.state.formData == 'Login'){
			this.setState({formData: 'Register',
			               postData:  '/Register'})
		} else {
			this.setState({formData: 'Login',
	                       postData: '/Login'
			})
			}
		
		
	}
	
	Login(){
		return(
		<div>
		<div className="form-group">
  <label className="col-md-4 control-label">Username</label>  
  <div className="col-md-4 inputGroupContainer">
  <div className="input-group">
  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
  <input  name="username" placeholder="username" className="form-control"  type="text" />
    </div>
  </div>
</div>


  <div className="form-group">
  <label className="col-md-4 control-label" >Password</label> 
    <div className="col-md-4 inputGroupContainer">
    <div className="input-group">
  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
  <input name="password" placeholder="password" className="form-control"  type="password" />
  </div>
  </div>
  </div>
		</div>
		)
	}
	
	
	
	
	
	//set as an entire other component
	Register(){
		return(
		<div>
		<div className="form-group">
  <label className="col-md-4 control-label">Username</label>  
  <div className="col-md-4 inputGroupContainer">
  <div className="input-group">
  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
  <input  name="username" placeholder="username" className="form-control"  type="text" />
    </div>
  </div>
</div>


<div className="form-group">
  <label className="col-md-4 control-label" >Password</label> 
    <div className="col-md-4 inputGroupContainer">
    <div className="input-group">
  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
  <input name="password" placeholder="password" className="form-control"  type="password" />
    </div>
  </div>
</div>

  <div className="form-group"> 
  <label className="col-md-4 control-label">Account Type</label>
    <div className="col-md-4 selectContainer">
    <div className="input-group">
        <span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>
    <select name="type" className="form-control selectpicker">
      <option>Individual</option>
      <option>Business</option>
    </select>
  </div>
</div>
</div>
  

<div className="form-group">
  <label className="col-md-4 control-label">Bank account number</label>  
  <div className="col-md-4 inputGroupContainer">
  <div className="input-group">
  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
  <input  name="account" placeholder="00012234559" className="form-control"  type="text" />
    </div>
  </div>
</div>




<div className="form-group">
  <label className="col-md-4 control-label" >Routing number</label> 
    <div className="col-md-4 inputGroupContainer">
    <div className="input-group">
  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
  <input name="routing" placeholder="111001101" className="form-control"  type="password"/>
    </div>
  </div>
</div>

       <div className="form-group">
  <label className="col-md-4 control-label">E-Mail</label>  
    <div className="col-md-4 inputGroupContainer">
    <div className="input-group">
        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" ></i></span>
  <input name="email" placeholder="E-Mail Address" className="form-control"  type="text" />
    </div>
  </div>
</div>
</div>
		);
	}
	
	/* add a removal component  ACCESS PAGE PAYLOAD*/
	

	
	
	
	
	render(){
		return(
		<div className = "container">
		<form className="well form-horizontal" action={this.state.formData} method="post"  id="contact_form">
    <fieldset>

    <legend><center><h2><b>{this.state.formData}</b></h2></center></legend><br/>
	
    <div>
	{(this.state.formData == 'Login') ? this.Login() : this.Register()}
	</div>

    <div className="form-group">
    <label className="col-md-4 control-label"></label>
    <div className="col-md-4">
    <input type="submit" className="btn btn-warning" type = "submit" value = {this.state.formData}/>
	 <br>
	 </br>
	 <a href = "" onClick = {this.handleChange}>Already Registered?</a>
     </div>
     </div>
     </fieldset>
     </form>
		
		
		
		</div>
		)
		
		
	}
	
	
}

export default Container;
