import React from 'react';
import CellData from './CellData';
import EventPopup from './EventPopup';


const EventDetail = React.createClass({
render(){
	console.log("from event Details", this.props.show)
	return(
		<td className="menu">
			<span className="eventSpan">{this.props.day}, {this.props.date} {this.props.month}</span>
			{
				this.props.show == "week" ? 
					<span onClick={()=>this.props.closeMoreButtonWeek(this.props.value,this.props.dayValue,"more")}
					 className="button">&times;</span>
					:
					<span onClick={()=>this.props.closeDetail(this.props.date,"more")}
					 className="button">&times;</span>
			}
			<div className="tbodydiv">
				<ul className="eventul">
					{
						this.props.show == "month" ? 
						this.props.items.map(item => <li className="eventCelli cellli" 
					onClick={()=>this.props.handleDetails(this.props.date,item)}>
						<span className="cellspan">{item.starttime}</span> {item.eventItem}</li>)
							:
						this.props.items.map(item => <li className="eventCelli cellli" 
					onClick={()=>this.props.handleDetailsWeek(this.props.value,this.props.dayValue,item)}>
						<span className="cellspan">{item.starttime}</span> {item.eventItem}</li>)

					}
				</ul>
			</div>
			<div>
			{
	            this.props.details && this.props.show == "month"? 
	            		<EventPopup 
	                        date={this.props.date} popupItem={this.props.popupItem} 
	                        closeDetail={this.props.closeDetail} show={this.props.show}
	                        deleteEventList={this.props.deleteEventList}/> 
	                        : 
	            this.props.detailsWeek && this.props.show == "week" ? 
	            		<EventPopup 
	                        date={this.props.date} popupItem={this.props.popupItem} 
	                        closeMoreButtonWeek={this.props.closeMoreButtonWeek} show={this.props.show}
	                        deleteEventList={this.props.deleteEventList} value={this.props.value} 
	                        day={this.props.dayValue}/>
	                        : " "

	        }
			</div>
		</td>
		)
	}
})

export default EventDetail;