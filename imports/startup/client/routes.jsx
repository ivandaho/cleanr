import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/app.jsx';

import { NotFound } from '../../ui/pages/not-found.jsx';

Meteor.startup( () => {
    render(
            <Router history={ browserHistory }>
                <Route path="/" component={ App } />
                <Route path="*" component={ NotFound } />
            </Router>,
            document.getElementById( 'react-root' )
          );
});
