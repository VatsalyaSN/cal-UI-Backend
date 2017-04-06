import React from 'react';

const TableHeader = (props) => {
	return(
			<thead className="theader">
				<tr className="theadtr">
					<th className="theadth">Sunday <span>{props.weekDate[0]}</span> </th>
					<th className="theadth">Monday <span>{props.weekDate[1]}</span> </th>
					<th className="theadth">Tuesday <span>{props.weekDate[2]}</span> </th>
					<th className="theadth">Wednesday <span>{props.weekDate[3]}</span> </th>
					<th className="theadth">Thursday <span>{props.weekDate[4]}</span> </th>
					<th className="theadth">Friday <span>{props.weekDate[5]}</span> </th>
					<th className="theadth">Saturday <span>{props.weekDate[6]}</span> </th>
				</tr>
			</thead>
		)
}

export default TableHeader;