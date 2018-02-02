import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios'
import style from './static/style.css';
import $ from "jquery"



class pastInfo extends React.Component {
	
	
	constructor(props){
		super(props);
		this.state = {
			ListInfo: {}
			
		}
		componentDidMount(){	
			$.ajax({url:'http://127.0.0.1:3000/ChangeBankInfo',
			dataType:'application/json',
			type:'GET',
			success: function (data){
				this.setState({
					ListInfo: data.info
				}, function(){
					
					
				})
			}
		})
		}
		ListOfCharges(){
			//list id, from which user, how much and when created
			
			
			
		}
		
		
		
		
		
		render(){
    return(
			<div>
		<div>
		<div className="form-group">
  <label className="col-md-4 control-label">Your Routing Number</label>  
  <div className="col-md-4 inputGroupContainer">
  <div className="input-group">
  <p className = "lead">
  {this.state.Bank.routing_number}
  
 


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
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}