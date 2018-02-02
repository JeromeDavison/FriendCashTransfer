import React from "react";
import ReactDOM from 'react-dom';
import style from './static/style.css'



class NavBar extends React.Component {
	
	render(){
		return(
		
		<nav className="navbar navbar-default">
        <div className="container-fluid">
        <div className="navbar-header">
        <a className="navbar-brand" href="#">FriendsFer</a>
        </div>
        <ul className="nav navbar-nav">
        <li><a href="/home">Home</a></li>
        <li><a href="/home">View Transactions</a></li>
        <li><a href="Sen">Pay Out Transaction</a></li>
        <li><a href="/acceptt">Accept Transaction</a></li>
        <li><a href="/PaymentScreen">Create Transaction</a></li>

        </ul>
        </div>
        </nav>
		
		
		
		
		);
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

export default NavBar