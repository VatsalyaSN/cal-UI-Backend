
import rootReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import {createStore, compose ,applyMiddleware} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import listOfEvents from './data/listOfEvents';

const d = new Date();
const val = 0;
const dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November', 'December'];
const dateOfMonth = new Date('"'+monthArr[d.getMonth()]+','+d.getFullYear()+'"');
// console.log("date0fmonth ",dateOfMonth);
const defaultState ={
	month :{
		monthArray : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November', 'December'],
		months : monthArr[d.getMonth()+val],
		year : d.getFullYear(),
		nextValue : 0,
		weekDate : [],
		nextWeekValue : 0,
		dateArray : [31,28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		date : [[1,2,3,4,5,6,7],[8,9,10,11,12,13,14],[15,16,17,18,19,20,21],[22,23,24,25,26,27,28], [29,30,31,'','',''],['','']],
		
		eventStoreMonth : [],
		showMore: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],
		details: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],
		popupItem : [],
		lastWeek : [],
		nextWeek : [],
		mObject : {
			date : d.getDate(),
			day : dayArray[d.getDay()],
			items : 0
		},
		plusButton:false
	},
    event :[],
    auth:{
        id : 0,
    	email : '',
    	username : '',
        statusText : '',
    } 
}

const store = createStore(rootReducer, defaultState,applyMiddleware(
    thunkMiddleware,logger()
  ));
console.log("STORE ",store.getState());
export const history=syncHistoryWithStore(browserHistory,store);

store.subscribe(()=> {
	console.log("store changed", store.getState());
})

export default store;
