import './App.scss';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// redux setup ###############################################################
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const history = createHistory();
const store = createStore(reducers, window._INITIAL_REDUX_STATE, applyMiddleware(reduxThunk, routerMiddleware(history)));

// import pages for site routing
import Home from 'pages/Home';
import Userprofile from 'pages/Userprofile';
import Login from 'components/Login';

class App extends React.Component {
	constructor(props) {
		super(props); {

		}
	}

	// _requireAuth = (nextState, replace) => {
	// 	if (isLoggedIn) {
	// 		replace({
	// 			pathname: "/userprofile",
	// 		});
	// 	}
	// 	else if (!isLoggedIn) {
	// 		replace({
	// 			pathname: "/login",
	// 		})
	// 	}
	// }

	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route exact path="/" component={Home}/>
{/*			  		<Route exact path="/userprofile" component={Userprofile} onEnter={this._requireAuth}/>
						<Route exact path="/login" component={Login} onEnter={this._requireAuth}/>
*/}					</Switch>
				</ConnectedRouter>
			</Provider>
		)
	}
}

export default App;