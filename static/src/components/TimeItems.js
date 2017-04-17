import React from 'react';
import CellData from './CellData';


const TimeItems = React.createClass({
	render(){
		return(
			<td className="weeklyViewtd">
				<div className="divtd">
					<ul className="timeul">{
        				this.props.item[0].map(item =>
            				{
               				if(item.eventItem != undefined)
               return <CellData item={item} len={this.props.item[0].length}></CellData>
         })}
            </ul></div></td>
			)
	}
})

export default TimeItems;