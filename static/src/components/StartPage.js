import React from 'react';
import { Link } from 'react-router';

const StartPage = React.createClass({
	handleSubmit(e){
		e.preventDefault();
		const email = this.refs.email_In.value;
		const password = this.refs.password_In.value;
		// console.log("HELLOW FORM STaRT",email,password)
		this.props.loginUser(email,password);
		this.refs.loginForm.reset();
	},
	handleSubmitForm(e){
		e.preventDefault();
		const email = this.refs.email.value;
		const username = this.refs.username.value;
		const password = this.refs.password.value;
		this.props.registerUser(email,username,password);
		this.refs.signupForm.reset();
	},


	render(){
		return(
			<div className="startpage">
				<div className="imageIn">
				<img src="https://res.cloudinary.com/dfimz9dwy/image/upload/v1494410776/image2_qnfynz.jpg" 
					className="image" alt="calendar Img"/>
				</div>
				<div className="formIn">
				<br></br>
				<form className='login-formIn' ref='loginForm' onSubmit={this.handleSubmit}>
					<div className="labelLogin">
					<label className="label1"> Email </label>
					<label className="label2">Password</label>
					</div>
					<input className="emailIn" type='email' ref='email_In' />
					<input className="passIn" type='password' ref='password_In'/>
					<button className="submitIn" type='submit'>Log In</button>
				</form>
				<div className="signDiv">
				<h4 className="label3">Sign up</h4>
				<form className='signup-form' ref='signupForm' onSubmit={this.handleSubmitForm}>
					<input className="signName" type='username' ref='username' placeholder='Username' />
					<input className="signEmail" type='email' ref='email' placeholder='Email' />
					<input className="signPass" type='password' ref='password' placeholder='Password' />
					<div>
					<button className="signSubmit" type='submit'>Submit</button>
					
					</div>
				</form>
				</div>

			</div>
			</div>
			)
	}

})

export default StartPage;

// <button className="loginBtn loginBtn--google" onClick={this.props.googleAccSync}>
  								// Sign up with Google
					// </button>