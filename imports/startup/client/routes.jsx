import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/app.jsx';

import { NotFound } from '../../ui/pages/not-found.jsx';

import { HomeComponent } from '/imports/ui/components/HomeComponent.jsx';
import { AccountComponent } from '/imports/ui/components/AccountComponent.jsx';
import { LoginComponent } from '/imports/ui/components/LoginComponent.jsx';
import { CustomerSessionDetailsComponent } from '/imports/ui/components/CustomerSessionDetailsComponent.jsx';

import AccountContainer from '/imports/ui/containers/AccountContainer.jsx';
import ScheduleContainer from '/imports/ui/containers/ScheduleContainer.jsx';
import ConfirmationContainer from '/imports/ui/containers/ConfirmationContainer.jsx';
import CustomerSessionDetailsContainer from '/imports/ui/containers/CustomerSessionDetailsContainer.jsx';
{/* import NavbarContainer from '/imports/ui/containers/NavbarContainer.jsx'; */}

Meteor.startup( () => {
    render(
            <Router history={ browserHistory }>
                <Route path="/" component={ App }>
                    <IndexRoute component={ HomeComponent } />
                    <Route path="/account" component={ AccountContainer } />
                    <Route path="/confirmation" component={ ConfirmationContainer } />
                    <Route path="/login" component={ LoginComponent } />
                    <Route path="/schedule" component={ ScheduleContainer } />
                    <Route path="/customersessiondetails/:sid"
                        component={ CustomerSessionDetailsContainer } />
                </Route>
                <Route path="*" component={ NotFound } />
            </Router>,
            document.getElementById( 'react-root' )
          );
});
