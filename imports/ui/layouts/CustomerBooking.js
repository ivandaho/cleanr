import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './CustomerBooking.html';

// this is for meteor session variables, not cleaning session
import { Session } from 'meteor/session';
import { Userdata } from '../../api/userdata/Userdata.js';
import { Sessions } from '../../api/sessions/Sessions.js';
import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Bookings } from '../../api/bookings/Bookings.js';

Template.CustomerBooking.onCreated(function CustomerBookingOnCreated() {
    sm.subscribe('sessions');
    sm.subscribe('userdata');
    sm.subscribe('timeslots');
    sm.subscribe('bookings');
});


Template.CustomerBooking.events({
    'click .morebtn' (event) {
        event.preventDefault();
        console.log('TODO: change treshold for recent sessions');
    },
    'click .lessbtn' (event) {
        event.preventDefault();
        console.log('TODO: change treshold for recent sessions');
    },
    'click .btn-cancel-sub' () {
        event.preventDefault();
        bootbox.confirm({
            message: 'Are you sure you want to cancel your subscription? You might not be able to book the same time slot in the future.',
            size: 'small',
            buttons: {
                confirm: {
                    label: "Yes, cancel it",
                    className: "btn-danger"
                },
                cancel: {
                    label: "No",
                    className: "btn-default"
                }
            },
            callback: function(result) {
                if (result) {
                    console.log(result);
                    Meteor.call('bookings.stopSubscription', FlowRouter.getParam('bid'), function(error) {
                        if (error) {
                            console.log(error);
                        };
                    });
                }
            },
            onEscape: function() {}
        });
    },
    'click .btn-re-sub' () {
        event.preventDefault();
        Meteor.call('bookings.reSubscribe', FlowRouter.getParam('bid'));
    }
});
