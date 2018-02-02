import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import {StripeProvider} from 'react-stripe-elements';
import {Elements} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';
import {CardElement} from 'react-stripe-elements';
import Receive from './Receive'



class MyStoreCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <Receive />
      </Elements>
    );
  }
}


const App = () => {
  return (
    <StripeProvider apiKey="pk_test_UQwIfiZxnciqQBJg6IohCw1T">
      <MyStoreCheckout />
    </StripeProvider>
  );
};







class Send extends React.Component {

	
	render(){
		
		return( 
	
		<App />
		
		);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

export default Send;