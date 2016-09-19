import './Header.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Notifications } from '/imports/api/notifications/Notifications.js';


Template.Header.onCreated(function AccountOnCreated() {
    Meteor.subscribe('userdata');
    Meteor.subscribe('notifications');
});

Template.Header.helpers({
    atleastonenotification() {
        thing = Notifications.find({seen: false});
        if (thing.count() > 0) {
            return true;
        }
        return false;
    },
    notificationfound() {
        return Notifications.find({seen: false});
    },
    isNewVendorSess(n) {
        if (n.type == 0) {
            // its a notification for vendor
            // telling them that a new session
            // has been assigned to them.
            return true;
        }
        return false;
    }
});

Template.Header.events({
    'click .dismissn' (event) {
        event.stopPropagation();
        event.preventDefault();
        let nid = event.target.id;
        Meteor.call('notifications.dismissNotification', nid);

    },
    'click .test-btn' (event) {
        event.preventDefault();
        bootbox.alert('test');
        //console.log('test account info clicked');
        /*
        TODO: set logic
        const target = event.target;
        const date = target.date.value;
        const package = target.package.value;
        Session.set('jobDate', date);
        Session.set('jobPackage', package);
        Meteor.call('jobs.pending', date, package);
        */
    },
    'click #demobtn' (event) {
        event.preventDefault();
        var tour = {
            showCloseButton: false,
            id: "nt",
            i18n:{stepNums: ["", "", "", "", "", "", ""]},
            steps: [
            {
                title: "View the schedule for available slots",
                target: "#booknowbtn",
                fixedElement: true,
                placement: "bottom"
            },
            {
                title: "Log In",
                content: "You can log in with the following example users to demo features:<br>e-mail: 'vendor@site.com' | 'verygoodvendorpassword'<br>e-mail: 'vendor2@site.com' | 'verygoodvendorpassword'<br>e-mail: 'cust1@site.com' | 'verygoodcustpassword'<br>e-mail: 'cust2@site.com'  | 'verygoodcustpassword'",
                target: "#loginlink",
                fixedElement: true,
                placement: "bottom"
            },
            {
                title: "Account Control Panel",
                content: "View account details, past sessions, and bookings. Additional Vendor features will be enabled if the account is a Vendor account.",
                target: "#accountcp",
                fixedElement: true,
                placement: "bottom"
            },
            {
                title: "Access Vendor Options",
                target: "#vendormenu",
                fixedElement: true,
                placement: "bottom"
            }
            ]
        };
        hopscotch.startTour(tour);
    },
});
