import React from 'react';

const CloseDetail = React.createClass({

	render(){
		return(
			<button onClick={this.props.closeDetail}>&times;</button>
			)
	}
})

export default CloseDetail;