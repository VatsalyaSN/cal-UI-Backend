import React from 'react';

const MonthOption = React.createClass({
	handleMonthColor(month){
		if(month == this.props.months)
			return "monthOpt currentMonth";
		else
			return "monthOpt";
	},
	handleClick(index){
		var d=new Date();
		this.props.handleMonth(index);
		// console.log(d.getMonth(),this.props.monthArray.indexOf(this.props.months))
		// if(d.getMonth() == this.props.monthArray.indexOf(this.props.months))
		// 	this.props.handleMdisplay(d.getDate(),this.props.months,this.props.year,"")
		// else
			this.props.handleMdisplay(1,index,this.props.year,"")
	},

	render(){
		return(
			<div className="monthOptDiv">
				<p className={this.handleMonthColor("January")} onClick={()=>this.handleClick(0)}>Jan</p>
				<p className={this.handleMonthColor("February")} onClick={()=>this.handleClick(1)}>Feb</p>
				<p className={this.handleMonthColor("March")} onClick={()=>this.handleClick(2)}>Mar</p>
				<p className={this.handleMonthColor("April")} onClick={()=>this.handleClick(3)}>Apr</p>
				<p className={this.handleMonthColor("May")} onClick={()=>this.handleClick(4)}>May</p>
				<p className={this.handleMonthColor("June")} onClick={()=>this.handleClick(5)}>Jun</p>
				<p className={this.handleMonthColor("July")} onClick={()=>this.handleClick(6)}>Jul</p>
				<p className={this.handleMonthColor("August")} onClick={()=>this.handleClick(7)}>Aug</p>
				<p className={this.handleMonthColor("September")} onClick={()=>this.handleClick(8)}>Sep</p>
				<p className={this.handleMonthColor("October")} onClick={()=>this.handleClick(9)}>Oct</p>
				<p className={this.handleMonthColor("November")} onClick={()=>this.handleClick(10)}>Nov</p>
				<p className={this.handleMonthColor("December")} onClick={()=>this.handleClick(11)}>Dec</p>
			</div>
			)
	}
})	

export default MonthOption;