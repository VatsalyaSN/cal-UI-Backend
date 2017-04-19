import axios from 'axios';
import {browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';


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
					console.log("SUCCESSFULL")
					browserHistory.push("/monthview");
				}catch(e){
					console.log("ERROR e ",e);
					alert(e);

				}
			})
	}
}


//EVENT 

function addEvent(date,starttime,endtime,event_detail,id,email){
	// console.log("ADD EVENT API >>>>>>>>")
	// console.log(date,starttime,endtime,event_detail)
	return axios.post('/api/event',{
		date,
		starttime,
		endtime,
		event_detail,
		id,
		email
	})
}

function displayEvent(data){
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
	return function(dispatch){
		// dispatch(addEventAction(date,time,event))
		return addEvent(date,starttime,endtime,event,id,email)
			.then(parseJSON)
			.then(response => {
				try{
					console.log("xxxxxxxxxxxxxxxxxxxxx")
					console.log(response.event);
					console.log(response.event.event_detail)
					// console.log(response.event.time);
					dispatch(displayEvent(response.event));
				}catch(e){
					// console.log("Error with event render",e);
					alert(e);
				}
			})
	}
}


function deleteEvent(id){
	return axios.post('/api/deleteEvent',{
		id
	})
}



function getEvents(id){
	return axios.post('/api/eventList',{
		id
	})
}

export function handleEventOnload(id,email){
	var x = localStorage.getItem('token');
	x = jwtDecode(x);
	console.log("EVENTONLOAD CALLED >>>>",x.id,x.email);
	var data={};
	return function(dispatch){
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
							event_id : detail.event_id
						}
						dispatch(displayEvent(data));
						})
						dispatch(addUserToStore(response.user,response.eventCount));
	
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

// 1export function handleOnUnmountMonthWeek(type){
// 		console.log("IN HANDLE ON UNMOUNT >>>>");
// 	if(type== "month")
// 		{
// 			dispatch(clearMonthStore());
// 		}

// 	else{
// 			dispatch(clearWeekStore());
// 	}
// }

function logout(){
	localStorage.removeItem('token')
	return{
		type:"LOGOUT_USER"
	}
}

export function logoutAndRedirect(){
	return (dispatch)=>{
		dispatch(logout());
		browserHistory.push('/');
	};
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
		console.log("FINALOS++IST ",finalList);

	
	return{
		type:'EVENT_MAPPING',
		finalList
	}
}


export function loadMonthEvent(state){
	var newList=[];
// console.log("load month events >>> ",state)
	for(var i=0;i<state.event.length;i++){
		console.log(state.event[i].dateItem.slice(5,7))
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


// export function handleToday(state){
// 		return {
// 			type : "GET_TODAY",
// 			state
// 		}
// }


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



// export function handleNext(state){
// 	return{
// 		type : "HANDLE_NEXT",
// 		state
// 	}
// }

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

// export function handlePrevious(state) {
// 	return{
// 		type:"HANDLE_PREVIOUS",
// 		state
// 	}
// }


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



// export function handleNextWeek(state){
// 	return{
// 		type:"HANDLE_NEXT_WEEK",
// 		state
// 	}
// }

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




// export function getCurrentWeek(state){
// 	return{
// 		type:"CURRENT_WEEK",
// 		state
// 	}
// }


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


// export function handlePreviousWeek(state){
// 	return{
// 		type : "HANDLE_PREVIOUS_WEEK",
// 		state
// 	}
// }

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
	if(viewType == "week")
	return{
		type : "HANDLE_ONLOAD"
	}
	else
	  return{
	  	type : "GET_TODAY"
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
	console.log("ID IN ACTION CLOSE",id);
	return{
		type : "CLOSE_DETAIL",
		id:id,
		button : button
			}
}

export function handleDetails(id,item){
	// console.log("HANDLE DETAILS action");
	return{
		type : "HANDLE_DETAILS",
		id:id,
		button : "details",
		item : item
	}
}

// export function addToItem(x){
// 	console.log("word-----",x);
// 	return{
// 		type : "APPEND_LETTER",
// 		x : x
// 	}
// }

function changeEvent(text,date,starttime,endtime,id){
	console.log("cccccccccccccc",text,date,starttime,endtime,id)
	return axios.post('/api/changeEvent',{
		id,
		text,
		date,
		starttime,
		endtime
	})
}

export function addToItem(eventEdit,date,starttime,endtime,id){
	console.log(eventEdit,id)
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

function adjustDisplay(id){
	console.log(id);
	return {
		type: "ADJUST_DISPLAY",
		id:id
	}
}

export function deleteEventList(id){
	console.log("FROM ACTION DELTE >",id)
	return function(dispatch,getState){
		return deleteEvent(id)
			.then(parseJSON)
			.then(response =>{
				try{
					console.log(response.message);
					dispatch(adjustDisplay(id));
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