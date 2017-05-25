import jwtDecode from 'jwt-decode';

function authReducer(state=[],action){
	switch(action.type){
		case 'REGISTER_USER_REQUEST':
			return Object.assign({},state);

		case 'LOGIN_USER_REQUEST':
		    return Object.assign({},state);

		case 'LOGIN_USER_SUCCESS':
			// console.log("from authReducer");
			// console.log("action payload ",action.payload["token"])
			const decode = jwtDecode(action.payload["token"])
			// console.log("USERNAME....",decode.username)
			return Object.assign({},state,{
				id : decode.id,
				email : decode.email,
				username : decode.username,
				statusText : "Logged in Successfully"
			});
			
		case 'REGISTER_USER_SUCCESS':
			const decodeI = jwtDecode(action.payload["token"])
			// console.log("USERNAME....",decodeI.username)
			return Object.assign({},state,{
				id : action.id,
				email : decodeI.email,
				username : decodeI.username,
				statusText : "Logged in Successfully"
			});

		case 'REGISTER_USER_FAILURE':
			return Object.assign({}, state, {
				token : null,
				username : ' ',
				statusText : `Register error : ${action.payload.status} ${action.payload.statusText}`
			})

		case 'ADD_USER_STORE':
			return Object.assign({},state,{
				id:action.user.id,
				username : action.user.username,
				eventCount : action.eventCount
			})

		case 'HANDLE_COUNT':
			return Object.assign({},state,{
				ecount : action.ecount
			});

		case 'LOGOUT_USER':
			return Object.assign({},state,{
				statusText : action.statusText
			})
			
		default:
			return state;
	}
}

export default authReducer;