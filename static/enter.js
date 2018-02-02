import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import { To1 } from './components.js'
"use strict";
/*figure out way to request some data from serv to prop */











class Container extends React.Component {
	constructor(prop){
		super(prop);
		this.state = {username:';eartmomh reacg son',
		              password:''
										  
				}
	}
    
   
    
	
	/* add a removal component  ACCESS PAGE PAYLOAD*/
	
	componentWillMount(){
		axios.get('http://127.0.0.1:3000/Data')
  .then(function (response) {
    console.log(response);
	console.log('innn');
  })
		
}
	
	
	

	
	
	
	render(){
		return(
		<div>
		<section className="container">
		<div className="container-page">				
			<div className="col-md-6">
				<h3 className="dark-grey">Registration</h3>
				
				<div className="form-group col-lg-12">{this.state.username}
					<label>Username</label>{}
					<input type="text" name="user" className="form-control" id=""  />
				</div>
				
				<div className="form-group col-lg-6">
					<label>Password {   
}

						
	                     
					
					</label>
					<input type="password" name="pass" className="form-control" id="" value="" />
				</div>
							<button type="submit" className="btn btn-primary">Register</button>
			</div>
		 <To1 />
			
		</div>
	</section>
		</div>
		)
		
		
	}
	
	
}
const Prop = <Container insert= "gen insert" />






    ReactDOM.render(
    Prop,
	document.getElementById('app'),
);