import React from 'react';
import { Link } from 'react-router';


const Dropdown = React.createClass({
	handlesignout(){
		console.log("IN DROPDOWN SIGNOUT")
      this.props.logoutAndRedirect();
      window.history.back();
	},

	render(){
		let greeting;
		// console.log(this.props.email)
		if(this.props.username != '')
			greeting = <p>{this.props.username.slice(0,1)}</p>;
		else
			greeting = "G"

		return(
			<div className="drop">
				<div className="circle">{greeting}</div>
				<p className="greets">{this.props.email ? this.props.email : "Guest User"}</p>
				<p onClick={()=>this.props.googleAccSync(this.props.id)} className="googlesync">Sync with Google Acc</p>
				<button onClick={()=>this.handlesignout()} className="signout">Sign out</button>
			</div>
			)
	}

})

export default Dropdown;