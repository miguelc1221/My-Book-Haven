import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app.js';
import Home from './components/home';
import Login from './components/login';
import SearchPage from './components/search';
import library from './components/library';

import requireAuth from './components/common/requireAuth';

export default (
    <Route path='/' component={ App } >
        <IndexRoute component={ requireAuth(Home) } />
        <Route path='/login' component={ Login } />
        <Route path='/search' component={ requireAuth(SearchPage) } />
        <Route path='/library' component={ requireAuth(library) } />
    </Route>
);
