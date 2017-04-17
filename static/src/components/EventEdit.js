import React from 'react';
import { browserHistory } from 'react-router'

const EventEdit = React.createClass({
	handleChange(){
		var character = this.refs.input.value;
		console.log("XXXXXX______XXXXXX",this.props.popupItem.eventId,this.props.popupItem)
		this.props.addToItem(character,this.props.popupItem.eventId);
		setTimeout(function(){browserHistory.goBack()},100);
	},

render(){
	return(
			<div>
				<input type="text" ref='input' defaultValue={this.props.popupItem.eventItem} />
				<input type="date"></input>
				<button onClick={this.handleChange}>Save</button>
				<button onClick={()=>browserHistory.goBack()}>Cancel</button>
			</div>
		)
	}
})


export default EventEdit;