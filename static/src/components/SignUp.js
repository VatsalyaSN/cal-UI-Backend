import React from 'react';
import { Link } from 'react-router';
import {render} from 'react-dom';

const SignUp = React.createClass({
	handleSubmit(e){
		e.preventDefault();
		const email = this.refs.email.value;
		const username = this.refs.username.value;
		const password = this.refs.password.value;
		this.props.registerUser(email,username,password);
		this.refs.signupForm.reset();
	},

	render(){
		return(
			<div>
			<button><Link to="/">Login</Link></button>
			<h4>Sign up </h4>
				<form className='signup-form' ref='signupForm' onSubmit={this.handleSubmit}>
					<input type='email' ref='email' placeholder='Email' />
					<input type='username' ref='username' placeholder='Username' />
					<input type='password' ref='password' placeholder='Password' />
					<button type='submit'>Submit</button>
				</form>
				<h4>{this.props.statusText}</h4>
			</div>
			)
	}
})

export default SignUp;