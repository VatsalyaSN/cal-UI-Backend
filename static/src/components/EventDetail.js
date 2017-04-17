import React from 'react';
import CellData from './CellData';
import EventPopup from './EventPopup';


const EventDetail = React.createClass({
render(){
	return(
		<td className="menu">
			<span className="eventSpan">{this.props.day}, {this.props.date} {this.props.month}</span>
			<span onClick={()=>this.props.closeDetail(this.props.date,"more")} className="button">&times;</span>
			<div className="tbodydiv">
				<ul className="eventul">
					{this.props.items.map(item => <li className="eventCelli cellli"><span className="cellspan">{item.starttime}</span> {item.eventItem}</li>)}
				</ul>
			</div>
			<div>
			{
	            this.props.details ? <EventPopup  handleDetails={this.props.handleDetails} 
	                                   date={this.props.date} popupItem={this.props.popupItem} 
	                                   closeDetail={this.props.closeDetail} 
	                                   deleteEventList={this.props.deleteEventList}/> : " "
	        }
			</div>
		</td>
		)
	}
})

export default EventDetail;