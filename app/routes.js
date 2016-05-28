import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './component/app.js';
import Home from './component/home';
import Login from './component/login';
import SearchPage from './component/search';
import library from './component/library';

import requireAuth from './component/common/requireAuth';

export default (
    <Route path='/' component={ App } >
        <IndexRoute component={ requireAuth(Home) } />
        <Route path='/login' component={ Login } />
        <Route path='/search' component={ requireAuth(SearchPage) } />
        <Route path='/library' component={ requireAuth(library) } />
    </Route>
);
