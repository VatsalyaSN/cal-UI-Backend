import React from 'react';
import { Link } from 'react-router';


const EventPopup = React.createClass({
	componentWillUnmount(){
		this.props.closeDetail(this.props.date,"details")
	},
	handleDeleteClick(){
		console.log("handleDeleteClick------");
		this.props.closeDetail(this.props.date,"details");
		this.props.deleteEventList(this.props.popupItem.eventId);
	},

	render(){
		console.log("FROm EVENTPOPUP ",this.props.popupItem);
		return(
			<div className="eventPopup">
				<span onClick={()=>this.props.closeDetail(this.props.date,"details")} className="button">&times;</span>
				<span>{this.props.popupItem.eventItem}</span>
				<span>{this.props.popupItem.starttime}</span> 
				<span>{this.props.popupItem.endtime}</span> 
				<button onClick={this.handleDeleteClick}>Delete</button>
				<button><Link to="/edit">Edit Event</Link></button>
			</div>
			)
		}
})

export default EventPopup;