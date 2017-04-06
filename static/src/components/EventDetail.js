import React from 'react';
import CellData from './CellData';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const EventDetail = React.createClass({
	render(){
		let menu;
		if(this.props.showMore){
						
		}
		else{
			menu="";
		}
		console.log("IN EVENT DETAIL COMP ",this.props.items)
		return(
			<td className="menu">
			<span className="eventSpan">{this.props.day}, {this.props.date} {this.props.month}</span>
			<span onClick={this.props.closeDetail} className="button">&times;</span>
			<div className="tbodydiv">
			<ul className="eventul">
			<ReactCSSTransitionGroup transitionName = "menu" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
				{this.props.items.map(item => <li className="eventCelli cellli"><span className="cellspan">{item.starttime}</span> {item.eventItem}</li>)}
      		</ReactCSSTransitionGroup>
			</ul>
			</div>
			</td>
			)
	}
})

export default EventDetail;