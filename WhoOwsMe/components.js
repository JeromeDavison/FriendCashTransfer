import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios'
import Container from  './enter';
import viewPay from './ViewPay';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Send from './Accept'
import Bank from './Bank'
import homePage from './homePage'
import Trans from './acceptTrans'


    ReactDOM.render(
    <Router>
	<div>
	<Route path ="/PaymentScreen" component = {viewPay} />
	<Route path ="/Login" component = {Container} />
    <Route path = "/Sen" component = {Send} />
    <Route path = "/BankInfo" component = {Bank} />
	<Route path = "/home" component = {homePage} />
	<Route path = "/Acceptt" component = {Trans} />

	</div>
	</Router>,
	document.getElementById('app'),
);

