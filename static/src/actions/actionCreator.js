import axios from 'axios';
import {browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import store from '../store'

function create_user(email,username,password){
	// console.log("IN axios");
	return axios.post('/api/create_user',{
		email,
		username,
		password
	})
}

function get_token(email,password){
	return axios.post('/api/get_token',{
		email,
		password
	})
}

function parseJSON(response) {
    return response.data;
}


export function registerUserRequest(state){
	return{
		type:"REGISTER_USER_REQUEST",
		state
		};
}

export function registerUserFailure(error){
	localStorage.removeItem('token');
    return {
        type: "REGISTER_USER_FAILURE",
        payload: {
            status: error.status,
            statusText: error.statusText,
        },
    };
}

export function registerUserSuccess(id,token){
	localStorage.setItem('token',token);
	return{
		type:"REGISTER_USER_SUCCESS",
		id : id,
		payload:{
			token
		}
	}
}

export function registerUser(email,username,password){
	return function(dispatch){
		dispatch(registerUserRequest());
		return create_user(email,username,password)
			.then(parseJSON)
            .then(response => {
                try {
                	dispatch(registerUserSuccess(response.id,response.token));
                    browserHistory.push('/monthview');
                } catch (e) {
                	dispatch(registerUserFailure({
                		response:{
                			status : 403,
                			statusText:'Invalid Token'
                		}
                	}))
                    console.log("404 ERROR")
                }
            })
            .catch(error => {
            	dispatch(registerUserFailure(error))
                alert("404 error");
            });
	}
}

function loginUserRequest(){
	return{
		type:"LOGIN_USER_REQUEST"
	}
}

function loginUserSuccess(token){
	// console.log("TOKEN",token)
	// console.log("Decoded one ",jwtDecode(token))
	localStorage.setItem('token',token);
	return{
		type:"LOGIN_USER_SUCCESS",
		payload:{
			token
		}
	}
}

export function loginUser(email,password){
	return function(dispatch){
		dispatch(loginUserRequest());
		return get_token(email,password)
			.then(parseJSON)
			.then(response => {
				try{
					dispatch(loginUserSuccess(response.token));
					// console.log("SUCCESSFULL")
					browserHistory.push("/monthview");
				}catch(e){
					console.log("ERROR e ",e);
					alert(e);

				}
			})
	}
}


function syncAccount(id){
	return axios.post('/api/syncAccount',
	{
		id
	})
}

export function googleAccSync(user_id){
	return function(dispatch){
		return syncAccount(user_id)
			.then(parseJSON)
			.then(response =>{
				try
				{
					console.log("SUCCESSFULL sync")
				}
				catch(e){
					console.log("Error",e)
				}
			})
	}
}





function logout(){
	// localStorage.removeItem('token')
	return{
		type:"LOGOUT_USER",
		statusText:"You have logged out"
	}
}

function signout(){
	return axios.post('/signout')
}

export function logoutAndRedirect(id){
	// console.log("HEY HERE IN LOGOUT",id)
	// console.log(localStorage.getItem('token'))
	localStorage.removeItem('token')
	// console.log("HERER>>>")
	return function(dispatch){
		return signout()
		.then(parseJSON)
		.then(response =>{
			try
			{
				console.log("SUCCESSFULL logout")
			}
			catch(e){
				console.log("Error",e)
			}
		})
	}
	
	// logout();
	}


//EVENT 
function formatLocalDate(sentTime) {
    var now = sentTime,
        tzo = -now.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return now.getFullYear() 
        + '-' + pad(now.getMonth()+1)
        + '-' + pad(now.getDate())
        + 'T' + pad(now.getHours())
        + ':' + pad(now.getMinutes()) 
        + ':' + pad(now.getSeconds()) 
        + dif + pad(tzo / 60) 
        + ':' + pad(tzo % 60);
}

function addEvent(date,starttime,endtime,event_detail,id,email){
	// console.log("ADD EVENT API >>>>>>>>")
	// console.log(date,starttime,endtime,event_detail)
	var extract=date.match(/[0123456789]/g);
	var y = extract.splice(0,4).join('')
	var m = extract.splice(0,2).join('')
	var dd=extract.join('')
	var startd=new Date(y,m-1,dd)
	var ex = starttime.match(/[0123456789]/g);
	var hh=ex.splice(0,2).join('')
	var mm=ex.join('')
	// console.log(hh,mm)
	startd.setHours(hh,mm,0,0)
	var endd = new Date(y,m-1,dd)
	ex=endtime.match(/[0123456789]/g);
	hh=ex.splice(0,2).join('')
	mm=ex.join('')
	endd.setHours(hh,mm,0,0)
	// console.log("DATE TIME",formatLocalDate(startd))
	var isoStarttime=formatLocalDate(startd)
	var isoEndtime=formatLocalDate(endd)
	return axios.post('/api/event',{
		date,
		starttime,
		endtime,
		event_detail,
		id,
		email,
		isoStarttime,
		isoEndtime
	})
}

function displayEvent(data){
	// console.log("DISPLAY EVENT---",data)
		return{
			type:"EVENT_DISPLAY",
			data
			}
}

function addUserToStore(user,eventCount){
	return{
		type:"ADD_USER_STORE",
		user,
		eventCount
	}
}


function addEventAction(date,starttime,endtime,event){
	return{
		type:"ADD_EVENT",
		date,
		starttime,
		endtime,
		event
	}
}

export function addEventList(date,starttime,endtime,event,id,email){
	return function(dispatch,getState){
		// dispatch(addEventAction(date,time,event))
		return addEvent(date,starttime,endtime,event,id,email)
			.then(parseJSON)
			.then(response => {
				try{
					// console.log("xxxxxxxxxxxxxxxxxxxxx")
					// console.log(response.event);
					// console.log(response.event.event_detail)
					// console.log(response.event.time);
					dispatch(displayEvent(response.event));
					const value = getState();
						const state = {
							event : value.event,
							monthArray : value.month.monthArray,
							months : value.month.months,
							weekDate : value.month.weekDate,
							year : value.month.year
								}
						dispatch(loadMonthEvent(state))
						dispatch(loadEvent(state))
				}catch(e){
					// console.log("Error with event render",e);
					alert(e);
				}
			})
	}
}


function getDataFromBackend(){
	// console.log("IN the backend axios" )
	return axios.post('/api/data')
}

function adjustMonthDisplay(idArr){
	return {
		type:"ADJUST_MONTH_DISPLAY",
		idArr
	}
}


export function foo(event){
	return function(dispatch,getState){
		console.log("!!!!!!!!!!!!!!!!!!!!!!!")
		var x = localStorage.getItem('token');
		// console.log(x.id);
		x = jwtDecode(x);
		return getEvents(x.id)
			.then(parseJSON)
			.then(response =>{
				try{
					var data=[];
					var dataId;
					var databaseId = []
					var stateId = []
					var data_new;
					var deletedId;
					response.event.forEach(function(detail){
						// console.log("iteration of array");
						// console.log(detail.date,detail.starttime,detail.event_detail);
						databaseId.push(detail.event_id)
					})

					const state_store = store.getState();
					// console.log(state_store);
					state_store.event.forEach(function(item){
						// console.log(item)
						stateId.push(item.eventId)
					})

					console.log(stateId)
					console.log(databaseId)

					if(databaseId.length < stateId.length)
					{
						deletedId = stateId.filter(function(l){
							return databaseId.indexOf(l) === -1;
						})

						response.event.forEach(function(item){
							data_new={
								dateItem:item.date,
					  			starttime:item.starttime,
					  			endtime : item.endtime,
					  			eventItem:item.event_detail,
					  			eventId : item.event_id,
					  			fromData : item.from_data
							}

							data.push(data_new)
						})

						const value = getState();
						console.log("TESTING BACK DT", value.event)
						console.log(data)
						dispatch(adjustDisplay(deletedId));
						const state = {
							event : data,
							monthArray : value.month.monthArray,
							months : value.month.months,
							weekDate : value.month.weekDate,
							year : value.month.year
								}
						dispatch(loadMonthEvent(state))
						dispatch(loadEvent(state))

					}
					else
					{
						dataId = databaseId.filter(function(v){
						return stateId.indexOf(v) === -1;
							})
						console.log(dataId)

						if(dataId.length){
						response.event.forEach(function(item_detail){
							for(var x=0;x<dataId.length;x++)
							{
								if(item_detail.event_id == dataId[x])
									data.push(item_detail)
							}
						})
						console.log("FINAL data")
						// console.log(data)
						}
						// dispatch(asyncFunction(data));
						
						data.forEach(function(data_item){
						data_new = {
							date:data_item.date,
							starttime:data_item.starttime,
							endtime:data_item.endtime,
							event_detail:data_item.event_detail,
							event_id : data_item.event_id,
							from_data : data_item.from_data
						}
						console.log("$$$$$$$$$$")
						dispatch(displayEvent(data_new));
						})

						deletedId = stateId.filter(function(l){
							return databaseId.indexOf(l) === -1;
						})

						if(deletedId.length)
						{
						dispatch(adjustDisplay(deletedId));
						dispatch(adjustMonthDisplay(deletedId));
						}
						dispatch(addUserToStore(response.user,response.eventCount));
						console.log("########")
						const value = getState();
						const state = {
							event : value.event,
							monthArray : value.month.monthArray,
							months : value.month.months,
							weekDate : value.month.weekDate,
							year : value.month.year
								}
						dispatch(loadMonthEvent(state))
						dispatch(loadEvent(state))
					}
				
					
				}
				catch(e){
					console.log("error",e)
				}
			})
	}
}


function deleteEvent(id,user_id){
	return axios.post('/api/deleteEvent',{
		id,
		user_id
	})
}



function getEvents(id){
	return axios.post('/api/eventList',{
		id
	})
}

function getItems(event,date,year,month){
		var items=[];
		var day;
		var dateN;
		var i,j;
		// console.log(date,event);
		event.forEach(function(item,i){
			// console.log("date from item",item.dateItem.slice(8,10),item.dateItem.slice(0,4),item.dateItem.slice(5,7));
				// console.log("date ",date,year,month);
				if(date == item.dateItem.slice(8,10) && year == item.dateItem.slice(0,4) && month == item.dateItem.slice(5,7)){
					// console.log("MATCHED ",date,item.dateItem.slice(8,10))
						// console.log("PUSH ",items);
						items.push(item)
					}
			
		})
		return items;
}


export function handleEventOnload(id,email){
	// console.log(localStorage.getItem('token'))
	var x = localStorage.getItem('token');
	// console.log(x);
	x = jwtDecode(x);
	// console.log("EVENTONLOAD CALLED >>>>",x.id,x.email);
	var data={};
	return function(dispatch,getState){
		return getEvents(x.id)
			.then(parseJSON)
			.then(response => {
				try{
					response.event.forEach(function(detail){
						// console.log("iteration of array");
						// console.log(detail.date,detail.starttime,detail.event_detail);
						data = {
							date:detail.date,
							starttime:detail.starttime,
							endtime:detail.endtime,
							event_detail:detail.event_detail,
							event_id : detail.event_id,
							from_data : detail.from_data
						}
						dispatch(displayEvent(data));
						})
						dispatch(addUserToStore(response.user,response.eventCount));
						const value = getState();
						const state = {
							event : value.event,
							monthArray : value.month.monthArray,
							months : value.month.months,
							weekDate : value.month.weekDate,
							year : value.month.year
								}
						dispatch(loadMonthEvent(state))
						dispatch(loadEvent(state))
						var d = new Date();
						var item;
						item = getItems(value.event,d.getDate(),d.getFullYear(),d.getMonth()+1);
						console.log(item)
						dispatch(handleMdisplay(d.getDate(),d.getMonth(),d.getFullYear(),item))
	
				}catch(e){
					console.log("Error with event render",e);
					alert(e);
				}
			
			})
			
	}
}



function clearMonthStore(){
	return{
			type:"MONTH_CLEAR"
			}
}

function clearMonthStore(){
	return{
			type:"WEEK_CLEAR"
			}
}

export function handleOnUnmount(){
return {
		type:"CLEAR_EVENTS"
	}
}





function getWeeklyEvent(state){
	var currentEvent=[];
	var date;
	// console.log(state.event.length);
	for(var i=0;i<state.event.length;i++){

		for(var k=0;k<state.weekDate.length;k++){
			if(state.weekDate[k] != " "){
				// console.log("IN HERE")
				date = state.year+"-"+('0' + (state.monthArray.indexOf(state.months)+1)).slice(-2)+"-"+('0' + state.weekDate[k]).slice(-2);
				if(date == state.event[i].dateItem)
				{
					currentEvent.push(state.event[i]);
					break;
				}
			}
		}
		
	}
	// console.log("CURRENT EVENT>>>",currentEvent);
	return currentEvent;
	
}



export function loadEvent(state){
	var finalList = [];
	var event={}
	var timeslot = [];
	var i,j;
	
	// console.log("FROM LOADEVENT ",state);
	var newList = getWeeklyEvent(state);
	
	for(j=0;j<1440;j++){
			timeslot[j] = [];
	}

	for(i=0;i<newList.length;i++){
		event = newList[i];
		var extractNum = newList[i].starttime.match(/[0123456789]/g);
		var hr = extractNum.splice(0,2).join('');
		var mins = extractNum.join('');
		event.start = (hr-1)*60 + parseInt(mins)+1;
		extractNum = newList[i].endtime.match(/[0123456789]/g);
		hr = extractNum.splice(0,2).join('');
		mins = extractNum.join('');
		event.end = (hr-1)*60 + parseInt(mins);
		// if(event.start > event.end){
		// 	var temp = event.start;
		// 	event.start = event.end;
		// 	event.end = temp;
		// }
		// event.ph = event.end - event.start;
	  }

		for(i=0;i<newList.length;i++){
			event = newList[i];
			// event.height = event.end - event.start;
			finalList.push(event);
		}
		// console.log("FINALOS++IST ",finalList);

	
	return{
		type:'EVENT_MAPPING',
		finalList
	}
}


export function loadMonthEvent(state){
	var newList=[];
// console.log("load month events >>> ",state)
	for(var i=0;i<state.event.length;i++){
		// console.log(state.event[i].dateItem.slice(5,7))
		if(('0' + (state.monthArray.indexOf(state.months)+1)).slice(-2) == state.event[i].dateItem.slice(5,7) && state.year == state.event[i].dateItem.slice(0,4)){
			newList.push(state.event[i]);
		}
	}
	// console.log("new list ",newList);
	return{
		type:'EVENT_MAPPING_MONTH',
		newList
	}
}


export function handleToday(state){
		return function(dispatch,getState){
		dispatch({
		type:"GET_TODAY",
		state
	})
	

	const value = getState();
	const state = {
		event : value.event,
		monthArray : value.month.monthArray,
		months : value.month.months,
		year : value.month.year
	}
	dispatch(loadMonthEvent(state))
	}
}


export function handleNext(state){
	return function(dispatch,getState){
		dispatch({
		type:"HANDLE_NEXT",
		state
	})
	

	const value = getState();
	const state = {
		event : value.event,
		monthArray : value.month.monthArray,
		months : value.month.months,
		year : value.month.year
	}
	dispatch(loadMonthEvent(state))
}
}


export function handlePrevious(state) {
	// console.log("HANDLE PREVIOUS>>",state);
	return function(dispatch,getState){
		dispatch({
		type : "HANDLE_PREVIOUS",
		state
	})
	
	const value = getState();
	const state = {
		event : value.event,
		monthArray : value.month.monthArray,
		months : value.month.months,
		year : value.month.year
	}
	dispatch(loadMonthEvent(state))
}	
}

export function handleNextWeek(state){
	return function(dispatch,getState){
		dispatch({
		type:"HANDLE_NEXT_WEEK",
		state
	})
	

	const value = getState();
	const state = {
		event : value.event,
		monthArray : value.month.monthArray,
		months : value.month.months,
		weekDate : value.month.weekDate,
		year : value.month.year
	}
	dispatch(loadEvent(state))
}
}


export function getCurrentWeek(state){
	return function(dispatch,getState){
		dispatch({
		type : "CURRENT_WEEK",
		state
	})	

	const value = getState();
	const state = {
		event : value.event,
		monthArray : value.month.monthArray,
		months : value.month.months,
		weekDate : value.month.weekDate,
		year : value.month.year
	}
	dispatch(loadEvent(state))
}
}


export function handlePreviousWeek(state){
	return function(dispatch,getState){
		dispatch({
		type : "HANDLE_PREVIOUS_WEEK",
		state
	})
	
	const value = getState();
	const state = {
		event : value.event,
		monthArray : value.month.monthArray,
		months : value.month.months,
		weekDate : value.month.weekDate,
		year : value.month.year
	}
	dispatch(loadEvent(state))
}	
}



export function handleOnload(viewType){
	var d=new Date()
	if(viewType == "week")
	return{
		type : "HANDLE_ONLOAD"
	}
	else
	  return{
	  	type : "MONTH",
	  	month : d.getMonth()
	  }
}

export function moreButton(id,showMore){
	return {
		type : "SET_BUTTON",
		id:id,
		button : "more",
		showMore : showMore
	}
}

export function closeDetail(id,button){
	// console.log("ID IN ACTION CLOSE",id);
	return{
		type : "CLOSE_DETAIL",
		id:id,
		button : button
			}
}

export function handleDetails(id,item){
	// console.log("HANDLE DETAILS action",id,item);
	return{
		type : "HANDLE_DETAILS",
		id:id,
		button : "details",
		item : item
	}
}


function changeEvent(text,date,starttime,endtime,id){
	// console.log("cccccccccccccc",text,date,starttime,endtime,id)
	return axios.post('/api/changeEvent',{
		id,
		text,
		date,
		starttime,
		endtime
	})
}

export function addToItem(eventEdit,date,starttime,endtime,id){
	// console.log(eventEdit,id)
	return function(dispatch,getState){
		return changeEvent(eventEdit,date,starttime,endtime,id)
			.then(parseJSON)
			.then(response => {
				try{
					handleEventOnload("","");
					const value= getState();
					const state = {
							event : value.event,
							monthArray : value.month.monthArray,
							months : value.month.months,
							year : value.month.year,
							weekDate : value.month.weekDate,
						}
					dispatch(loadMonthEvent(state));
					dispatch(loadEvent(state));
				}
				catch(e){

				}
			})
	}
}

function adjustDisplay(idArr){
	// console.log(id);
	return {
		type: "ADJUST_DISPLAY",
		idArr
	}
}

export function deleteEventList(id, user_id){
	// console.log("FROM ACTION DELTE >",id)
	return function(dispatch,getState){
		return deleteEvent(id,user_id)
			.then(parseJSON)
			.then(response =>{
				try{
					// console.log(response.message);
					var idArr=[];
					idArr.push(id)
					dispatch(adjustDisplay(idArr));
					const value= getState();
					const state = {
							event : value.event,
							monthArray : value.month.monthArray,
							months : value.month.months,
							year : value.month.year,
							weekDate : value.month.weekDate,
						}
					dispatch(loadMonthEvent(state));
					dispatch(loadEvent(state));
				}
				catch(e){
					console.log("Error with event delete",e);
					alert(e);
				}
			})
	}
}

export function moreButtonWeek(value,day){
	return {
		type : "SET_WEEK_BUTTON",
		value:value,
		day : day
	}
}

export function closeMoreButtonWeek(value,day,button){
	return{
		type : "CLOSE_WEEK_BUTTON",
		value:value,
		day : day,
		button:button
	}
}

export function handleDetailsWeek(value,day,item){
	// console.log("HANDLE DETAILS action",day);
	return{
		type : "HANDLE_DETAILS_WEEK",
		value:value,
		day : day,
		item : item
	}
}

export function mdisplay(date,day){
	return {
		type : "DISPLAY",
		date : date,
		day : day
	}
}

export function handleMonth(month){
	return function(dispatch,getState){
		dispatch({
		type:"MONTH",
		month:month
	})
	
	const value = getState();
	const state = {
		event : value.event,
		monthArray : value.month.monthArray,
		months : value.month.months,
		year : value.month.year
	}
	dispatch(loadMonthEvent(state))
}	
}

export function caretNext(){
	return{
		type:"NEXT"
	}
}

export function caretPrevious(){
	return{
		type:"PREVIOUS"
	}
}

export function currentYear(){
	// console.log("IN THE CURRE year actiom")
	return{
		type:"CURRENT_SECTION"
	}
}

export function handleMdisplay(date,month,year,items){
	return {
		type:"HANDLE_MDISPLAY",
		date:date,
		month:month,
		year:year,
		items:items
	}
}

export function handlePlusButton(){
	return{
		type: "PLUS_BUTTON"
	}
}

export function handleClosePlusButton(){
	return{
		type:"CLOSE_PLUS_BUTTON"
	}
}
