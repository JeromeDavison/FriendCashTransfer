import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios'
import style from './static/style.css';


class viewPay extends React.Component {
	
	
	constructor(props){
		super(props);
		this.state = {
				
		}
		
	}
	
	/* ajax request to server with list of owed cash */
	

	   
	   
	 
	 
	  
	  
	  
	  componentWillUpdate(){
		  
	  }
	  
	  
	  
	
	render(){
		return (
		<div className = "container">
		<form className="well form-horizontal" action="/createTransfer" method="post"  id="contact_form">
    <fieldset>

    <legend><center><h2><b>Welcome! Who are you paying Today?</b></h2></center></legend>
	
		<div>
		<div className="form-group">
        <label className="col-md-4 control-label">To:</label>  
        <div className="col-md-4 inputGroupContainer">
        <div className="input-group">
        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
        <input  name="username" placeholder="username" className="form-control"  type="text" />
    </div>
  </div>
</div>


      <div className="form-group">
      <label className="col-md-4 control-label" >Amount:</label> 
      <div className="col-md-4 inputGroupContainer">
      <div className="input-group">
      <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
      <input name="howMuch" placeholder="password" className="form-control"  type="text" />
    </div>
  </div>
</div>

 <div className="form-group">
      <label className="col-md-4 control-label" >For:</label> 
      <div className="col-md-4 inputGroupContainer">
      <div className="input-group">
      <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
      <input name="ForItem" placeholder="password" className="form-control"  type="text" />
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
     </fieldset>
     </form>
		
		
		
		</div>
		)
		
		
		
	}
	
	
	
	
	
	
	
}



export default viewPay;