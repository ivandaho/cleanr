import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// if you have the js file you don't need the html file????? see input. not imported
import '../../ui/layouts/Account.html';
import '../../ui/layouts/Account.js';
import '../../ui/layouts/Booking.html';
import '../../ui/layouts/Booking.js';
import '../../ui/layouts/Changepwd.html';
import '../../ui/layouts/Changepwd.js';
import '../../ui/layouts/Confirmation.html';
import '../../ui/layouts/Confirmation.js';
import '../../ui/layouts/Footer.html';
import '../../ui/layouts/Header.html';
import '../../ui/layouts/Header.js';
import '../../ui/layouts/HomeLayout.html';
//import '../../ui/layouts/Input.js';
import '../../ui/layouts/Login.html';
import '../../ui/layouts/Login.js';
import '../../ui/layouts/MainLayout.html';
import '../../ui/layouts/NavbarUserControl.html';
import '../../ui/layouts/NavbarUserControl.js';
import '../../ui/layouts/Passwordrecovery.html';
import '../../ui/layouts/Passwordrecovery.js';
import '../../ui/layouts/Registration.html';
import '../../ui/layouts/Registration.js';
import '../../ui/layouts/Registration2.html';
import '../../ui/layouts/Registration2.js';
import '../../ui/layouts/Resetpassword.html';
import '../../ui/layouts/Resetpassword.js';
import '../../ui/layouts/Schedule.html';
import '../../ui/layouts/Schedule.js';
import '../../ui/layouts/Userform.html';
import '../../ui/layouts/VendorCP.html';
import '../../ui/layouts/VendorCP.js';
import '../../ui/layouts/VendorCustomer.html';
import '../../ui/layouts/VendorCustomer.js';
import '../../ui/layouts/VendorCustomerList.html';
import '../../ui/layouts/VendorCustomerList.js';
import '../../ui/layouts/VendorRegistration.html';
import '../../ui/layouts/VendorRegistration.js';
import '../../ui/layouts/VendorWorkSchedule.html';
import '../../ui/layouts/VendorWorkSchedule.js';
import '../../ui/layouts/VendorSessionDetails.html';
import '../../ui/layouts/VendorSessionDetails.js';
// need to import the js file, for subscriptions

import '../../ui/components/jobitem.html';

FlowRouter.route('/', {
    name: 'home',
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
    triggersEnter: [function() {
        if (Meteor.user() == null) {
            // if user is not logged in
            // FlowRouter.go('login');
        }
    }],
    action() {
        BlazeLayout.render('MainLayout', {main: 'Account'})
    }
});

FlowRouter.route('/booking/:bid', {
    name: 'booking',
    action(params, queryParams) {
        BlazeLayout.render('MainLayout', {main: 'Booking'})
    }
});

FlowRouter.route('/confirmation', {
    name: 'confirmation',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Confirmation'})
    }
});

FlowRouter.route('/login', {
    name: 'login',
    triggersEnter: [function() {
        if (Meteor.user() != null) {
            // if user is logged in
            FlowRouter.go('account');
        }
    }],
    action() {
        BlazeLayout.render('MainLayout', {main: 'Login'})
    }
});

FlowRouter.route('/passwordrecovery', {
    name: 'passwordrecovery',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Passwordrecovery'})
    }
});

FlowRouter.route('/registration', {
    name: 'registration',
    triggersEnter: [function() {
        if (Meteor.user() != null) {
            // if user is logged in
            FlowRouter.go('account');
        }
    }],
    action() {
        BlazeLayout.render('MainLayout', {main: 'Registration'})
    }
});

FlowRouter.route('/registration/step2', {
    name: 'registration2',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Registration2'})
    }
});

FlowRouter.route('/changepwd',{
    action() {
        BlazeLayout.render('MainLayout', {main: 'Changepwd'})
    }
});

FlowRouter.route('/reset-password/:token',{
    action (params) {
        BlazeLayout.render('MainLayout', {main: 'Resetpassword'})
    }
});

FlowRouter.route('/schedule', {
    name: 'schedule',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Schedule'})
    }
});

FlowRouter.route('/vendorcp', {
    name: 'vendorcp',
    action() {
        BlazeLayout.render('MainLayout', {main: 'VendorCP'})
    }
});

FlowRouter.route('/vendorcustomer/:custid', {
    name: 'vendorcustomer',
    action(params, queryParams) {
        BlazeLayout.render('MainLayout', {main: 'VendorCustomer'})
    }
});

FlowRouter.route('/vendorcustomers', {
    name: 'vendorcustomers',
    action() {
        BlazeLayout.render('MainLayout', {main: 'VendorCustomerList'})
    }
});

FlowRouter.route('/vendorregistration', {
    name: 'vendorregistration',
    action() {
        BlazeLayout.render('MainLayout', {main: 'VendorRegistration'})
    }
});
FlowRouter.route('/vendorworkschedule', {
    name: 'vendorworkschedule',
    action() {
        BlazeLayout.render('MainLayout', {main: 'VendorWorkSchedule'})
    }
});
FlowRouter.route('/vendorsessiondetails/:sessid', {
    name: 'vendorsessiondetails',
    action: function(params, queryParams) {
        BlazeLayout.render('MainLayout', {main: 'VendorSessionDetails'})
    }
});
FlowRouter.route('/verify-email/:token', {
    name: 'verify-email',
    action(params) {
        Accounts.verifyEmail(params.token, (error) =>{
            if (error) {
                // console.log(error.reason);
            } else {
                FlowRouter.go( '/' );
                // console.log('Email verified! Thanks!');
            }
        });
    }
});

