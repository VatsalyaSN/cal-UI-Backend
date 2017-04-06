import React from 'react';
import { Link } from 'react-router';

const StartPage = React.createClass({
	handleSubmit(e){
		e.preventDefault();
		const email = this.refs.email.value;
		const password = this.refs.password.value;
		this.props.loginUser(email,password);
		this.refs.loginForm.reset();
	},

	render(){
		return(
			<div>
				<button><Link to="/signup">Signup</Link></button>
				<br></br>
				<div>
				<h4>Login</h4>
				<form className='login-form' ref='loginForm' onSubmit={this.handleSubmit}>
					<input type='email' ref='email' placeholder='Email' />
					<input type='password' ref='password' placeholder='Password' />
					<button type='submit'>Login</button>
				</form>
				<h4>{this.props.statusText}</h4>
			</div>
			</div>
			)
	}

})

export default StartPage;