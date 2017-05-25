import React from 'react';
import {Icon} from 'react-fa';
import Dropdown from './Dropdown.js';
import Mdisplay_1 from './Mdisplay_1.js';
import Mdisplay_2 from './Mdisplay_2.js';


const Mdisplay = React.createClass({
	getInitialState(){
		return{
			bar : 0
		}
	},

	handleBar(bar1){
		// console.log(bar1)
		this.setState({
			bar: !bar1
		})
	},

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
		<div className={this.monthColor(this.props.months,"div")}>
				<p className="addSpace"></p>

			<span className="fa fbars" onClick={()=>this.handleBar(this.state.bar)}>
					<Icon name="bars" size="2x" className="bars"/>
				</span>
				{
					this.state.bar?<Dropdown googleAccSync={this.props.googleAccSync}
				logoutAndRedirect={this.props.logoutAndRedirect} username={this.props.username}
				email={this.props.email} id={this.props.id}/> : ""
				}
			<p className="addSpace"></p>
			{
				this.props.plusButton ? 
				<Mdisplay_2 addEventList={this.props.addEventList} startDate={this.props.startDate} 
							startTime={this.props.startTime} endTime={this.props.endTime} 
							handleClosePlusButton={this.props.handleClosePlusButton} id={this.props.id}
							email={this.props.email} months={this.props.months} 
							monthArray={this.props.monthArray} handleMonth={this.props.handleMonth}/>
				:
				<Mdisplay_1 mObject={this.props.mObject} months={this.props.months} 
				plusButton={this.props.plusButton} handlePlusButton={this.props.handlePlusButton}/>
			}
		</div>
		)
	}
})

export default Mdisplay;



