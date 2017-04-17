import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreator from '../actions/actionCreator';
import Main from './Main.js';



function mapStateToProps(state){
	// console.log("this is from app ",state.months);
	return {
		months:state.month.months,
		monthArray : state.month.monthArray,
		nextValue : state.month.nextValue,
		year : state.month.year,
		dateArray : state.month.dateArray,
		date: state.month.date,
		daysOfWeek : state.month.daysOfWeek,
		weekDate : state.month.weekDate,
		nextWeekValue : state.month.nextWeekValue,
		event : state.event,
		eventStore : state.month.eventStore,
		eventStoreMonth : state.month.eventStoreMonth,
		showMore : state.month.showMore,
		email:state.auth.email,
		username:state.auth.username,
		statusText : state.auth.statusText,
		id : state.auth.id,
		details : state.month.details,
		popupItem : state.month.popupItem,
		lastWeek : state.month.lastWeek,
		nextWeek : state.month.nextWeek,
		showMoreWeek : state.month.showMoreWeek,
		detailsWeek:state.month.detailsWeek,
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreator, dispatch);
}


const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;