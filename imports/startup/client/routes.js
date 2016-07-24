import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// if you have the js file you don't need the html file?????
import '../../ui/layouts/Account.html';
import '../../ui/layouts/Account.js';
import '../../ui/layouts/Input.js';
import '../../ui/layouts/HomeLayout.html';
import '../../ui/layouts/MainLayout.html';
import '../../ui/layouts/SessionConfirmation.html';
import '../../ui/layouts/SessionConfirmation.js';
import '../../ui/components/jobitem.html';

import '../../ui/layouts/Signup.html';
import '../../ui/layouts/Login.html';
import '../../ui/layouts/Header.html';
import '../../ui/layouts/Header.js';
import '../../ui/layouts/Schedule.html';
import '../../ui/layouts/Schedule.js';
// need to import the js file, for subscriptions


FlowRouter.route('/', {
    name: 's',
    action() {
        BlazeLayout.render('HomeLayout')
    }
});

FlowRouter.route('/input', {
    name: 'input',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Input'})
    }
});

FlowRouter.route('/account', {
    name: 'account',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Account'})
    }
});

FlowRouter.route('/confirmation', {
    name: 'confirmation',
    action() {
        BlazeLayout.render('MainLayout', {main: 'SessionConfirmation'})
    }
});

FlowRouter.route('/schedule', {
    name: 'schedule',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Schedule'})
    }
});
