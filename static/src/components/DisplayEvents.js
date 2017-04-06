import React from 'react';

const DisplayEvents = React.createClass({
	render(){
	console.log("DISPLAY EVENT ",this.props);
		
		return(
			<div>
			<h4>{this.props.dateItem}</h4>
			<h5>{this.props.time}</h5>
			<ul>
			<li>{this.props.eventItem}</li>
			</ul>
			</div>
			)
	}
})

export default DisplayEvents;