import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import Main from './components/Main';
import MonthView from './components/MonthView';
import StartPage from './components/StartPage';
import EventEdit from './components/EventEdit';

import {Provider} from 'react-redux';
import store from './store';
import * as actionCreators from './actions/actionCreator';
import css from './styles/style.styl';


import {Router, Route, IndexRoute, browserHistory } from 'react-router';

// console.log("CALENDAR ",store.getState());

const router = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={StartPage}></IndexRoute>
				<Route path="/monthview" component={MonthView} />
				<Route path="/edit" component={EventEdit} />
			</Route>
		</Router>
	</Provider>
	)

const rendered = () => {render(router , document.getElementById('root'))};

store.subscribe(rendered);
rendered();
