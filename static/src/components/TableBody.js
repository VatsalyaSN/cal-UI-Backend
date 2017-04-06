import React from 'react';
import {render} from 'react-dom';
import CellData from './CellData';
import TableBodyItems from './TableBodyItems';
import EventDetail from './EventDetail';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const TableBody= React.createClass({
render(){
   // console.log("hey",this.props.showMore);
	return(
		<tr>
         {
            this.props.showMore[0] && this.props.item[0].length != 0 ? <EventDetail date={this.props.date[0]} day="Sunday" month={this.props.month} items={this.props.item[0]} closeDetail={this.props.closeDetail} /> : <TableBodyItems date={this.props.date[0]} item={this.props.item[0]} moreButtonAction={this.props.moreButtonAction} />
         }
         {
            this.props.showMore[1] && this.props.item[1].length != 0 ? <EventDetail date={this.props.date[1]} day="Monday" items={this.props.item[1]} closeDetail={this.props.closeDetail}/> : <TableBodyItems date={this.props.date[1]} item={this.props.item[1]} moreButtonAction={this.props.moreButtonAction} />
         }
         {
            this.props.showMore[2] && this.props.item[2].length != 0 ? <EventDetail date={this.props.date[2]} day="Tuesday" items={this.props.item[2]} closeDetail={this.props.closeDetail}/> : <TableBodyItems date={this.props.date[2]} item={this.props.item[2]} moreButtonAction={this.props.moreButtonAction} />
         }
         {
            this.props.showMore[3] && this.props.item[3].length != 0 ? <EventDetail date={this.props.date[3]} day="Wednesday" items={this.props.item[3]} closeDetail={this.props.closeDetail}/> : <TableBodyItems date={this.props.date[3]} item={this.props.item[3]} moreButtonAction={this.props.moreButtonAction} />
         }
         {
            this.props.showMore[4] && this.props.item[4].length != 0 ? <EventDetail date={this.props.date[4]} day="Thursday" items={this.props.item[4]} closeDetail={this.props.closeDetail}/> : <TableBodyItems date={this.props.date[4]} item={this.props.item[4]} moreButtonAction={this.props.moreButtonAction} />
         }
         {
            this.props.showMore[5] && this.props.item[5].length != 0 ? <EventDetail date={this.props.date[5]} day="Friday" items={this.props.item[5]} closeDetail={this.props.closeDetail}/> : <TableBodyItems date={this.props.date[5]} item={this.props.item[5]} moreButtonAction={this.props.moreButtonAction} />
         }
         {
            this.props.showMore[6] && this.props.item[6].length != 0 ? <EventDetail date={this.props.date[6]} day="Saturday" items={this.props.item[6]} closeDetail={this.props.closeDetail}/> : <TableBodyItems date={this.props.date[6]} item={this.props.item[6]} moreButtonAction={this.props.moreButtonAction} />
         }

      </tr>
		)
	}
})

export default TableBody;