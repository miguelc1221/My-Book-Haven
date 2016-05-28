import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import ReduxThunk from 'redux-thunk'
import { routerMiddleware, push } from 'react-router-redux'

import routes from './routes.js';
import reducers from './reducers';

const reduxRouter = routerMiddleware(browserHistory);

const store = createStore(
    reducers,
    applyMiddleware(ReduxThunk, reduxRouter)
);

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('root')
);
