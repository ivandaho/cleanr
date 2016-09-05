import '/imports/startup/client/config/velocity_callouts.js';

previousPathsObj = {};
exemptPaths = ['/place/']; // these are the paths that we don't want to remember the scroll position for.
function thisIsAnExemptPath(path) {
    var exemptPath = false;
    _.forEach(exemptPaths, function (d) {
        if (path.indexOf(d) >= 0) {
            exemptPath = true;
            return exemptPath;
        }
    });
    return exemptPath;
}
function saveScrollPosition(context) {
    var exemptPath = thisIsAnExemptPath(context.path);
    if (!exemptPath) {
        // add / update path
        previousPathsObj[context.path] = $('body').scrollTop();
    }
}
function jumpToPrevScrollPosition(context) {

    // var path = context.path;
    var path = window.location.pathname;
    var scrollPosition = 0;
    if (!_.isUndefined(previousPathsObj[path])) {
        // previousPathsObj[context.path]
        scrollPosition = previousPathsObj[path];
    }
    if (scrollPosition === 0) {
        // we can scroll right away since we don't need to wait for rendering
        $('body').animate({scrollTop: scrollPosition}, 0);
    } else {
        $("body").css("opacity", 0);
        // Now we need to wait a bit for blaze/react does rendering.
        // We assume, there's subs-manager and we've previous page's data.
        // Here 10 millis delay is a arbitrary value with some testing.
        setTimeout(function () {
            $("html").velocity("scroll",
                    {offset: scrollPosition, duration:1});
            $("body").velocity("callout.fadeInAlt");
            // $('body').animate({scrollTop: scrollPosition}, 0);
        }, 10);
    }
}

function scrollToTop() {
    $('body').animate({scrollTop: 0}, 0);
};

FlowRouter.triggers.exit([saveScrollPosition]);

// FlowRouter.triggers.enter([jumpToPrevScrollPosition]);
FlowRouter.triggers.enter([scrollToTop], {except: ["confirmation"]});

$(window).on('popstate', function(event) {
    jumpToPrevScrollPosition();
});

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

FlowRouter.route('/customersessiondetails/:sessid', {
    name: 'customersessiondetails',
    action: function(params, queryParams) {
        BlazeLayout.render('MainLayout', {main: 'CustomerSessionDetails'})
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

