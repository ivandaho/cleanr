import './NotificationView.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Notifications } from '../../api/notifications/Notifications.js';

Template.NotificationView.onCreated(function NotificationsOnCreated() {
    Meteor.subscribe('notifications');
    Session.set('nlimit', 10);
});

Template.NotificationView.helpers({
    allnotifications() {
        var nlimit = Session.get('nlimit');
        var thing = Notifications.find({},
                            {
                                sort: {createdDate: 1},
                                limit: nlimit
                            });
        // counts the number of sessions found
        var newcount = thing.count();
        // sets the number of sessions found
        Session.set('ncount', newcount);

        // if the new count is same as the old count
        if (newcount < Session.get('nlimit')) {
            Session.set('nmaxed', true);
        } else {
            Session.set('nmaxed', false);
        }
        if (thing.count() != 0) {
            return thing;
        } else {
            return false;
        }
    }
});

Template.NotificationView.events({
    'click .vm-n' (event) {
        event.preventDefault();
        if (Session.get('nmaxed') != true) {
            Session.set('nlimit', Session.get('nlimit') + 10);
            setTimeout(function () {
            $(".n-row").velocity("stop");
            $(".n-row").velocity("callout.emerge", {stagger: 5});
            }, 10);
        }
    },
    'click .vl-n' (event) {
        event.preventDefault();
        if (Session.get('nlimit') - 10 < 10) {
            Session.set('nlimit', 10)
        } else {
            Session.set('nlimit', Session.get('nlimit') - 10);
        }
    },
});
