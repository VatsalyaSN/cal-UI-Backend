import React from 'react';
import Button from './Button';

const Header = React.createClass({
	handleDates(date){
		// console.log("date ",date);
		var start = 0;
		var end = 6;
		for(var i=0;i<7;i++){
			// console.log(date[i],typeof date[i])
			if(date[i] === ' ' && date[i] !== 'undefined' && date[i] === 'string')
				{end = end - i;
					break;
				}
			else if(typeof date[i] !== 'number')
			{
				end = i-1;
				// console.log("in here")
				break;
			}
		}
		for(var j=0;j<7;j++){
			if(date[j] !== ' '){
				start = j;
			if(typeof date[6] === 'number')
				end = 6;
				break;
			}
		}
		if(start === end)
			return date[start];
		else if(date === ' ')
			return ' ';
		else
		return date[start]+' - '+date[end];
	},

	render(){
		return(
			<div className="headerStyle">
				<Button value={'<'} onClick={this.props.handlePrevious}/>
				<Button value={'>'} onClick={this.props.handleNext}/>
				<Button value={'today'} onClick={this.props.today}/>
				<span>{this.handleDates(this.props.date)} {this.props.months}{this.props.year}</span>
				<Button value={'Month'} />
				<Button value={'Week'} />
				<Button value={'Days'} />
				<Button value={'List Of Events'}/>
			</div>
			)
	}
})

export default Header;