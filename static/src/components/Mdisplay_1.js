import React from 'react';
import {Icon} from 'react-fa';
import Dropdown from './Dropdown.js';

const Mdisplay_1 = React.createClass({
	monthColor(month,comp){
		var cn;
		if(comp == 'div'){
			if(this.props.size == "less")
			cn = 'mdisplay msize'
		else
			cn = 'mdisplay'
		}
		else{
			cn = 'mulist style-2'
		}
		

		switch(month){
			case 'January':
				return cn+' mjan';
			case 'February':
				return cn+' mfeb';
			case 'March':
				return cn+' mmar';
			case 'April':
				return cn+' mapr';
			case 'May':
				return cn+' mmay';
			case 'June':
				return cn+' mjun';
			case 'July':
				return cn+' mjul';
			case 'August':
				return cn+' maug';
			case 'September':
				return cn+' msep';
			case 'October':
				return cn+' moct';
			case 'November':
				return cn+' mnov';
			case 'December':
				return cn+' mdec';
			default:
				return cn;

		}
	},
	render(){
		return(
			<div>
			<p className="mdate">{this.props.mObject.date}</p>
			<p className="mday">{this.props.mObject.day}</p>
			
			{
				this.props.mObject.items.length ?
			<ul className={this.monthColor(this.props.months,"ul")}>
				{this.props.mObject.items.map((item,i) =>
        			{if(item.eventItem != undefined)
               			return <li className="mlist">
               			<span className="mspan">{item.starttime}</span>
				{item.eventItem}
				<hr className="mhr"></hr>
				</li>

                     		})
                     	}
			</ul>
				:
			<p className="noEvent">No Events !</p>	
			}
			<span className="mcreateOpt" onClick={this.props.handlePlusButton}>
				<Icon name="plus" size="lg" className="plus" />
				<span className="createOpt">Create an Event</span> 
					
				</span>
				
			</div>
			)
	}
})

export default Mdisplay_1;