import React from 'react';
import { Link } from 'react-router';

const Button = (props) => {
	if(props.value === 'Month'){
		return(<button onClick={props.onClick}><Link to="/monthview">Month</Link></button>);
	}
	else if(props.value === 'Week'){
		return(<button onClick={props.onClick}><Link to="/weekview">Week</Link></button>);
	}
	else if(props.value === 'List Of Events'){
		return(<button onClick={props.onClick}><Link to="/eventlist">Event List</Link></button>);
	}

	else
	return(
		<button onClick={props.onClick}>{props.value}</button>
		)
}

export default Button;