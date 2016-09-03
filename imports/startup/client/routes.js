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
FlowRouter.route('/account2', {
    name: 'account2',
    triggersEnter: [function() {
        if (Meteor.user() == null) {
            // if user is not logged in
            // FlowRouter.go('login');
        }
    }],
    action() {
        BlazeLayout.render('MainLayout', {main: 'Account_2'})
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

FlowRouter.route('/vendorspecify', {
    name: 'vendorspecify',
    action() {
        BlazeLayout.render('MainLayout', {main: 'VendorSpecify'})
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

