import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios'
import style from './static/style.css';
import {injectStripe} from 'react-stripe-elements'; 
 import {CardElement} from 'react-stripe-elements';
 import NavBar from './navBar'

class CardSection extends React.Component {
  render() {
    return (
      <label>
        Card details
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>
    );
  }
};
 
class Receive extends React.Component {
	
	constructor (props){
		super(props);
		this.state = {
			username:null	
	}
	}
	componentDidMount(){
     /*  Get username and set it for stripe token */
	axios.get('http://127.0.0.1:3000/requestUser').then((response) => {
    
	this.setState({
		username: response.data.data.username
	 })
	})
	}
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
 
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: this.state.username}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });
 
    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }
  
  
  
  render() {
    return (
	<div>
	<NavBar />
     <form onSubmit={this.handleSubmit} action = "/Transfer" method = "POST" id = "payment-form">
    
    
	<label>
    <span>InvoiceID: </span>
    <input className="field" placeholder="text" name="ID" />
    </label>
	<label>
    <span>howMuch: </span>
    <input className="field" placeholder="text" name="much" />
    </label>
    <CardSection />
    <button>Confirm order</button>
      </form>
	  </div>
    );
  }
}
 
export default injectStripe(Receive);