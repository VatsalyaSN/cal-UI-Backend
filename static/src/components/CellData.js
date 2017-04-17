import React from 'react';

const CellData = (props) => {
	// console.log("from CellData",props.item);
	return(<li className="cellli" onClick={()=>props.handleDetails(props.date,props.item)}>
			<span className="cellspan">{props.item.starttime}</span> {props.item.eventItem}</li>)
}

export default CellData;