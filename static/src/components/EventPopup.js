import React from 'react';
import { Link } from 'react-router';


const EventPopup = React.createClass({
	componentWillUnmount(){
		if(this.props.show == "week")
			this.props.closeMoreButtonWeek(this.props.value,this.props.day,"details")
		else
			this.props.closeDetail(this.props.date,"details")
	},
	handleDeleteClick(){
		// console.log("handleDeleteClick------");
		if(this.props.show == "week")
			this.props.closeMoreButtonWeek(this.props.value,this.props.day,"details")
		else
			this.props.closeDetail(this.props.date,"details");
		this.props.deleteEventList(this.props.popupItem.eventId,this.props.id);
	},

	render(){
		// console.log("FROm EVENTPOPUP ",this.props.popupItem,this.props);
		return(
			<div className="eventPopup">
			{
				this.props.show == "week" ?
				<span onClick={()=>this.props.closeMoreButtonWeek(this.props.value,this.props.day,"details")} className="button">&times;</span>
					:
				<span onClick={()=>this.props.closeDetail(this.props.date,"details")} className="button">&times;</span>
			}
				<span className="eventDetails">{this.props.popupItem.eventItem}</span>
				<span className="eventCaption">when</span>
				<span className="eventStart">{this.props.popupItem.starttime}-{this.props.popupItem.endtime}</span> 
				<button onClick={this.handleDeleteClick} className="deleteBtn">Delete</button>
				<button className="editLinkBtn"><Link to="/edit">Edit Event</Link></button>
			</div>
			)
		}
})

export default EventPopup;