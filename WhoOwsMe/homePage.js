import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios'
import style from './static/style.css';
import NavBar from './navBar'
import $ from "jquery"
class homePage extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			Username:'', 
			Details:[],
			Activated:[],
			notActivated:[]
		}
		
		this.PayInfoLoop = this.PayInfoLoop.bind(this);
	}
	
		componentDidMount(){
			axios.get('http://127.0.0.1:3000/homePage').then((response) => {
				// push into isActivated if is activated
				this.setState({Details:response.data.data, 
				Username:response.data.data}, function (err, succ){
					console.log(this.state.Details)
		  })				
		 })
		}
		
    PayInfoLoop(){
    var list;
	list = this.state.Details;
	var GenTableRows = list.map((invoiceList, index) => 
	
	<tr>
	<td>{invoiceList.fromUsername}</td>
	<td>{invoiceList.ForItem}</td>
	<td>{invoiceList.fromUsername}</td>
	<td>{invoiceList.invoiceId}</td>
    <td key = {index}>{invoiceList.howMuch}</td>

    </tr>	
	
	
	
	
	
    );
	
	
	
	
	
	return(
	<table className = "table table-bordered">
	<thead>
        <tr>
            <th>From Friend</th>
            <th>For What</th>
            <th> Pay ID</th>
            <th>How much</th>
        </tr>
    </thead>
	<tbody>
	{GenTableRows}
	</tbody>
	</table>
	);
	}

	
	
	
		
	 
	
	render(){
		return(
		<div className = "container">
		<div className = "row">
		<NavBar />
		
		
		<div className = "col-md-12">
        <legend><center><h2><b>Welcome! Here are your current transactions!</b></h2></center></legend><br/>
	    <div className = "row">
	    <div className = "col-md-12">
	    <h1 className = {style.soul} >Current Transactions Accepted</h1>
		{this.PayInfoLoop()}
		
		
		
		
		
         <div className="form-group">
         <label className="col-md-4 control-label"></label>
    
	     <div className="col-md-4">
         <center> <input type="submit" className="btn btn-warning" type = "submit" value = "New Transfer" href = "/Acceptt"/></center>
	     <br>
	     </br>
         </div>
         </div>
	     </div>
	
	
	  
	
	
	
	
	</div>
	  </div>
	   </div>
		</div>
		
		
		
		
		
	);	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}


export default homePage;
