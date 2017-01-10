import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/app.jsx';

import { NotFound } from '../../ui/pages/not-found.jsx';

import { HomeComponent } from '/imports/ui/components/HomeComponent.jsx';
import { ScheduleComponent } from '/imports/ui/components/ScheduleComponent.jsx';
import { AccountComponent } from '/imports/ui/components/AccountComponent.jsx';
import { LoginComponent } from '/imports/ui/components/LoginComponent.jsx';

import AccountContainer from '/imports/ui/containers/AccountContainer.jsx';
{/* import NavbarContainer from '/imports/ui/containers/NavbarContainer.jsx'; */}

Meteor.startup( () => {
    render(
            <Router history={ browserHistory }>
                <Route path="/" component={ App }>
                    <IndexRoute component={ HomeComponent } />
                    <Route path="/schedule" component={ ScheduleComponent } />
                    <Route path="/account" component={ AccountContainer } />
                    <Route path="/login" component={ LoginComponent } />
                </Route>
                <Route path="*" component={ NotFound } />
            </Router>,
            document.getElementById( 'react-root' )
          );
});
