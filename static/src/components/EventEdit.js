import React from 'react';
import { browserHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import css from 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import TimePicker from 'react-bootstrap-time-picker';

const EventEdit = React.createClass({
	
	getInitialState: function() {
		const d = this.props.popupItem.dateItem.match(/[0123456789]/g);
	const year = d.splice(0,4).join('');
	const mm = d.splice(0,2).join('');
	const dd = d.splice(0,2).join('');
    return {
      startDate: moment(new Date(year,mm-1,dd)),
      starttime : this.props.popupItem.starttime,
      endtime: this.props.popupItem.endtime
    };
  },

  handleChangeDate: function(date) {
    console.log(date,date.toDate(),date.format("YYYY-MM-DD"));
    this.setState({
      startDate: date
    });
  },

  dateFormat(time){
  	console.log(time);
  	time = (time/3600);
  	console.log(time)
  	var hr = ("0"+/[0-9]+/.exec(time)).slice(-2);
  	var min=0;
  	time.toString().length == 3 || time.toString().length == 4 ? min=30 : min="00";
  	console.log(hr,min,hr+":"+min)
    return time = hr+":"+min;
  },

  handleChangeTime:function(time){
  	time = this.dateFormat(time);
  	this.setState({
  		starttime : time
  	});
  },

  handleChangeEndtime(time){
  	time = this.dateFormat(time);
  	this.setState({
  		endtime : time
  	});
  },

  handleChange(){
		var character = this.refs.input.value;
		const date = this.state.startDate.format("YYYY-MM-DD");
		const starttime = this.state.starttime;
		const endtime = this.state.endtime;
		console.log("XXXXXX______XXXXXX",this.props.popupItem.eventId,this.props.popupItem)
		this.props.addToItem(character,date,starttime,endtime,this.props.popupItem.eventId);
		setTimeout(function(){browserHistory.goBack()},100);
	},

render(){
	console.log(this.props.popupItem);
	return(
			<div className="editDiv">
				<button className="editSave" onClick={this.handleChange}>Save</button>
				<button className="editDiscard" onClick={()=>browserHistory.goBack()}>Discard changes</button>
				<input className="editInput" type="text" ref='input' defaultValue={this.props.popupItem.eventItem} />
				<div>
        <label>Date : </label>
				<DatePicker className="editDate" selected={this.state.startDate} onChange={this.handleChangeDate} />
				</div>
        <div className="start">
        <label className="labelStart">Start time : </label>
				<TimePicker className="editTimePicker" onChange={this.handleChangeTime} value={this.state.starttime}/>
				</div>
        <div className="start">
        <label className="labelStart">End time : </label>
				<TimePicker className="editTimePicker" onChange={this.handleChangeEndtime} value={this.state.endtime}/>
				</div>
			</div>
		)
	}
})


export default EventEdit;