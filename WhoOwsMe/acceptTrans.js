import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios'
import style from './static/style.css';
import $ from "jquery"
import NavBar from './navBar'


class Trans extends React.Component {
	
	
	constructor(props){
		super(props);
		this.state = {
			           Details:[],
						
		}
      this.PayInfoLoop = this.PayInfoLoop.bind(this);
	}
	
	/* ajax request to server with list of owed cash */
	
	componentDidMount(){
		axios.get('http://127.0.0.1:3000/unaccept').then((response) => {
		this.setState({Details:response.data.data}, function (err, succ){
					console.log(this.state.Details)
		  })
		})
        
		 
		 
		 }
	  
	   
	   
	 PayInfoLoop(){
   
	var GenTableRows = this.state.Details.map((invoiceList, index) => 
	
	<tr>
	<td>{invoiceList.fromUsername}</td>
	<td>{invoiceList.ForItem}</td>
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
            <th>Pay ID</th>
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
		return (
		<div className = "container">
		<NavBar />
		{this.PayInfoLoop()}
		<form className="well form-horizontal" action="/acceptTransfer" method="post"  id="contact_form">
    <fieldset>

    <legend><center><h2><b>Welcome! Who are you paying Today?</b></h2></center></legend>
	
		<div>
		<div className="form-group">
        <label className="col-md-4 control-label">input ID:</label>  
        <div className="col-md-4 inputGroupContainer">
        <div className="input-group">
        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
        <input  name="ID" placeholder="username" className="form-control"  type="text" />
    </div>
  </div>
</div>










	</div>

    <div className="form-group">
    <label className="col-md-4 control-label"></label>
    <div className="col-md-4">
    <input type="submit" className="btn btn-warning" type = "submit" value = "Accept!"/>
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



export default Trans;