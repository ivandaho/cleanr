import './Header.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Notifications } from '/imports/api/notifications/Notifications.js';

Template.Header.onCreated(function AccountOnCreated() {
    sm.subscribe('userdata');
    sm.subscribe('notifications');
    sm.subscribe('sessions');
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
    }
});

Template.Header.events({
    'click .dismissn' (event) {
        event.stopPropagation();
        event.preventDefault();
        let nid = event.target.id;
        Meteor.call('notifications.dismissNotification', nid);

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
                content: "You can log in with the following example users to demo features:<br>e-mail: 'vendor@site.com' | 'verygoodvendorpassword'<br>e-mail: 'vendor2@site.com' | 'verygoodvendorpassword'<br>e-mail: 'cust1@site.com' | 'verygoodcustpassword'<br>e-mail: 'cust2@site.com'  | 'verygoodcustpassword'<br>e-mail: 'cust3@site.com' | 'verygoodcustpassword'",
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
            },
            {
                title: "Access new notifications here",
                target: "#notificationdd",
                fixedElement: true,
                placement: "bottom"
            }
            ]
        };
        hopscotch.startTour(tour);
    },
});
