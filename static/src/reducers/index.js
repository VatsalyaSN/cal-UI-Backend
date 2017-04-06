import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import monthReducer from './monthReducer';
import eventsReducer from './eventsReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({month:monthReducer,event:eventsReducer,auth:authReducer,routing:routerReducer});

export default rootReducer;