import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios'
import style from './static/style.css';
import $ from "jquery"
class Bank extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			Bank: {},
			changeAccInfo:false
		}
		this.ChangeBankInfo = this.ChangeBankInfo.bind(this);
		this.ModifyForm = this.ModifyForm.bind(this);
		this.viewBank = this.viewBank.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
		componentDidMount(){
			axios.get('http://127.0.0.1:3000/AccountData').then((response) => {
				this.setState({
					Bank:response.data.BankInfo.external_accounts.data[0]
				})
				
				
				
			
			
			})
		}
		
		
		ChangeBankInfo(){
         $.ajax({url:'http://127.0.0.1:3000/ChangeBankInfo',
		 dataType:'application/json',
		 type:'POST',
		 data:({"BankInfo":this.state.Bank.id,
              "AcctInfo":this.state.Bank.account
		        })
		 })
			// make form and allow them to post to change their data
		} 
		
		ModifyForm(){
			return(
			<div>
			

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

 
      </div>			
		);	
		}
		
		
		viewBank(){
			return (
		<div>
		<div>
		<div className="form-group">
  <label className="col-md-4 control-label">Your Routing Number</label>  
  <div className="col-md-4 inputGroupContainer">
  <div className="input-group">
  <p className = "lead">
  {this.state.Bank.routing_number}
  
  </p>
    </div>
  </div>
</div>
</div>

<div>
		<div className="form-group">
  <label className="col-md-4 control-label">Last 4 of account number:</label>  
  <div className="col-md-4 inputGroupContainer">
  <div className="input-group">
  <p className = "lead">
	Last4: {this.state.Bank.last4}
  </p>
    </div>
  </div>
</div>
</div>


<div>
		<div className="form-group">
  <label className="col-md-4 control-label">Bank name:</label>  
  <div className="col-md-4 inputGroupContainer">
  <div className="input-group">
  <p className = "lead">
  Bank name is: 
  {console.log(this.state.Bank)}
  </p>
    </div>
  </div>
</div>
</div>


    <div className="form-group">
    <label className="col-md-4 control-label"></label>
    <div className="col-md-4">
    <input type="submit" className="btn btn-warning" type = "submit" value = "Send Cash!"/>
	 <br>
	 </br>
     </div>
     </div>
    </div>	
	);
	}
	
	
	handleChange(e){
		e.preventDefault();
		if (this.state.changeAccInfo == false){
			this.setState({changeAccInfo: true})
		} else {
			this.setState({changeAccInfo: false
			})
			}
		
		
	}
	 
	
	render(){
		return(
		<div className = "container">
		<form className="well form-horizontal" method="post"  id="contact_form">
    <fieldset>

    <legend><center><h2><b>Welcome {this.state.Bank.account_holder_name}.Here is your current Bank account info</b></h2></center></legend><br/>
		
		
		<div>
		{(this.state.changeAccInfo == false) ? this.viewBank() : this.ModifyForm()} // add another component to render
		</div>
<div className="form-group">
    <label className="col-md-4 control-label"></label>
    <div className="col-md-4">
    <input type="submit" className="btn btn-warning" type = "submit" value = "Register!"/>
	 <br>
	 </br>
	 <a href = "" onClick = {this.handleChange}>Already Registered?</a>
     </div>
     </div>
     </fieldset>
     </form>
		
		
		</div>
		
		
		
		
	);	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}


export default Bank;